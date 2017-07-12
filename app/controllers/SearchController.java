package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import models.SearchResult;
import models.User;
import models.dao.SearchResultDAO;
import models.dao.SearchResultDAOImpl;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
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
import services.search.repositories.InternetArchiveSearchRepository;
import services.search.repositories.SearchRepository;

import javax.inject.Inject;
import java.util.ArrayList;
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
    //private SearchResultDAO searchResultDAO;
    public static SearchResultDAO searchResultDAO=new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());
    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());

    @Inject
    public SearchController( HttpExecutionContext ec, Manager queryManager, WSClient wsClient){
        this.ec=ec;
        this.queryManager=queryManager;
        this.wsclient=wsClient;
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> search() {
        JsonNode jsonRequest = request().body().asJson();
        Logger.info("OCD search received: " + jsonRequest.toString());
        List<String> keywords=getKeyWords(jsonRequest);
        SearchManager searchManager=new SearchManager();
        searchManager.setKeyWords(keywords);
        // TODO dinamically read repository
        SearchRepository youtube=new YoutubeSearchRepository(wsclient);
        SearchRepository internetArchive=new InternetArchiveSearchRepository(wsclient);
        SearchRepository pexels=new PexelsSearchRepository(wsclient);
        SearchRepositoryFactory srf=new SearchRepositoryFactory();
        Class[] params={WSClient.class};
        Object[] values={wsclient};
        SearchRepository y=srf.newInstance("Youtube", params, values);
        List<SearchRepository> repositories=new ArrayList<SearchRepository>();
        repositories.add(y);
        repositories.add(internetArchive);
        repositories.add(pexels);
        List<CompletionStage<List<MultimediaContent>>> dispatched=searchManager.dispatch(repositories);
        CompletionStage<List<MultimediaContent>> aggregated=searchManager.aggregate(dispatched);
        CompletionStage<SearchResult> transformedQuery=aggregated.thenApply(l -> {
            SearchResult qr=new SearchResult();
            qr.setKeyWords(keywords);
            qr.setMultimediaContents(l);
            qr.setUser(UserController.userDAO.findByUsername("ppanuccio")); // TODO set connected user
            return  qr;
        });
        //SearchResultDAOImpl searchResultDAO=new SearchResultDAOImpl(SearchResult.class,MongoDBService.getDatastore());
        transformedQuery.thenApply(p -> searchResultDAO.save(p));
        CompletionStage<Result> promiseOfResult = transformedQuery.thenApply(( p ) -> ok(p.asJson()));
        return promiseOfResult;
    }

    public CompletionStage<Result> getSearchResults(String username){
        //SearchResultDAOImpl searchResultDAO=new SearchResultDAOImpl(SearchResult.class,MongoDBService.getDatastore());
        CompletionStage<Result> results= CompletableFuture.supplyAsync( () -> searchResultDAO.findByUsername(username))
                                                                    .thenApply( sr -> ok(Json.toJson(sr)));
        return results;
    }

    private List<String> getKeyWords( JsonNode jsonRequest ) {
        List<String> keyWords = new ArrayList<String>();
        if(jsonRequest.get("keyWords").textValue()!=null && !jsonRequest.get("keyWords").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("keyWords").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("freeText").textValue()!=null && !jsonRequest.get("freeText").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("freeText").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("semanticSearch").textValue()!=null && !jsonRequest.get("semanticSearch").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("semanticSearch").textValue().split(" ")).collect(Collectors.toList()));

        return keyWords;
    }

}


