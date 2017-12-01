package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import models.dao.*;
import models.response.RepositoryResponseMapping;
import models.response.ResponseMapping;
import org.bson.types.ObjectId;
import play.Logger;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.libs.ws.WSClient;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;
import services.search.Manager;
import services.search.SearchManager;
import services.search.repositories.*;
import services.search.repositories.SearchRepository;

import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class SearchController extends Controller {

    private HttpExecutionContext ec;
    private Manager queryManager;
    private WSClient wsclient;
    public static SearchResultDAO searchResultDAO=new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());
    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());
    public static RegistrationDAO registrationDAO=new RegistrationDAOImpl(Registration.class, MongoDBService.getDatastore());
    public static MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class, MongoDBService.getDatastore());
    public static SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");


    @Inject
    public SearchController( HttpExecutionContext ec, Manager queryManager, WSClient wsClient){
        this.ec=ec;
        this.queryManager=queryManager;
        this.wsclient=wsClient;
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> search() {
        JsonNode jsonRequest = request().body().asJson();
        User user=Secured.getUser(ctx());
        Logger.info("OCD search received: " + jsonRequest.toString());
        List<String> keywords=getKeyWords(jsonRequest);

        // fetch cached data if any
        List<SearchResult> fetchedResults=fetchCachedSearch(keywords);
        if(!fetchedResults.isEmpty() && fetchedResults.size()==1){
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(fetchedResults.get(0))));
        }


        SearchManager searchManager=new SearchManager();
        searchManager.setKeyWords(keywords);

        // load dinamically registered and enabled repositories
        SearchRepositoryFactory srf=new SearchRepositoryFactory();
        Stream<Registration> userRepositories=registrationDAO.findRegistrationByUser(Secured.getUser(ctx())).stream();
        List<SearchRepository> repositories=userRepositories.
                filter(sr -> sr.isEnabled()).
                map(r -> {
            Class[] params={WSClient.class, Registration.class};
            Object[] values={wsclient, r};
            return srf.newInstance(r.getRepository().getName(), params,values);
        }).collect(Collectors.toList());


        List<CompletionStage<RepositoryResponseMapping>> dispatched=searchManager.dispatch(repositories);
        CompletionStage<List<MultimediaContent>> aggregated=searchManager.aggregate(dispatched);
        CompletionStage<SearchResult> transformedQuery=aggregated.thenApply(l -> {
            SearchResult qr=new SearchResult();
            //l.forEach(mc -> multimediaContentDAO.save(mc));
            qr.setKeyWords(keywords);
            qr.setMultimediaContents(l);
            qr.setUser(user);
            qr.setnOfResults(l.size());
            try {
                qr.setInDate(sdf.parse(jsonRequest.get("inDate").textValue()));
                qr.setEndDate(sdf.parse(jsonRequest.get("endDate").textValue()));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return  qr;
        });
        //SearchResultDAOImpl searchResultDAO=new SearchResultDAOImpl(SearchResult.class,MongoDBService.getDatastore());
        CompletionStage<JsonNode> jsonResult=transformedQuery.thenApply(p -> p.asJson());
        transformedQuery.thenApply(p -> {/*p.setMultimediaContents(null);*/
        return searchResultDAO.save(p);});
        CompletionStage<Result> promiseOfResult = jsonResult.thenApply(( p ) -> ok(p));
        return promiseOfResult;
    }

    private List<SearchResult> fetchCachedSearch(List<String> keywords) {
        SearchResultDAO searchResultDAO=new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());
        return searchResultDAO.findByKeywords(keywords);
    }

    public CompletionStage<Result> getSearchResults(String username){
        CompletionStage<Result> results= CompletableFuture.supplyAsync( () -> searchResultDAO.findByUser(userDAO.findByUsername(username)))
                                                                    .thenApply( sr -> ok(Json.toJson(sr)));
        return results;
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String username, String ids){
        if(username==null){
            return CompletableFuture.supplyAsync(() -> badRequest("The Username should be specified!"));
        }
        else {
            User user = userDAO.findByUsername(username);
            if (user != null) {
                List<String> idsToRemove = Arrays.asList(ids.split(","));
                if (idsToRemove.size() == 0) {
                    return CompletableFuture.supplyAsync(() -> badRequest("The Bookmark id should be specified as parameter!"));
                } else if (idsToRemove.size() == 1) {
                    if (searchResultDAO.get(idsToRemove.get(0)) != null) {
                        return CompletableFuture.supplyAsync(() -> ok(Json.toJson(searchResultDAO.deleteById(new ObjectId(idsToRemove.get(0))))));
                    } else {
                        return CompletableFuture.supplyAsync(() -> notFound("The Bookmark specified doesn't exists!"));
                    }
                } else {
                    return CompletableFuture.supplyAsync(() -> {
                        idsToRemove.stream()
                                .forEach(id -> searchResultDAO.deleteById(new ObjectId(id)));
                        return noContent();
                    });
                }
            } else {
                return CompletableFuture.supplyAsync(() -> notFound("The Username doesn't exists!"));
            }
        }
    }

    private List<String> getKeyWords( JsonNode jsonRequest ) {
        List<String> keyWords = new ArrayList<String>();
        if(jsonRequest.get("keyWords").textValue()!=null && !jsonRequest.get("keyWords").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("keyWords").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("freeText").textValue()!=null && !jsonRequest.get("freeText").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("freeText").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("semanticSearch").textValue()!=null && !jsonRequest.get("semanticSearch").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("semanticSearch").textValue().split(" ")).collect(Collectors.toList()));
        return keyWords;
    }



}


