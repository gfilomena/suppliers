package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import models.QueryResult;
import play.Logger;
import play.libs.concurrent.HttpExecutionContext;
import play.libs.ws.WSClient;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.MongoDBService;
import services.search.Manager;
import services.search.SearchManager;
import services.search.repositories.InternetArchiveRepository;
import services.search.repositories.Repository;
import services.search.repositories.YoutubeRepository;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
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
        /*CompletionStage<JsonNode> executedQuery = queryManager.getYoutubeRepository().executeQuery(keywords);
        CompletionStage<QueryResult> transformedQuery=executedQuery.thenApply( ( JsonNode j ) -> {
            YoutubeRepositoryResponseTransformer t=new YoutubeRepositoryResponseTransformer();
            QueryResult qt=new QueryResult();
            qt.setKeyWords(keywords);
            qt.setMultimediaContents(t.tranform(j));
            return qt;
        });
        transformedQuery.thenApply(p -> MongoDBService.getDatastore().save(p));
        CompletionStage<Result> promiseOfResult = transformedQuery.thenApply(( p ) -> ok(p.asJson()));
        return promiseOfResult;*/
        SearchManager searchManager=new SearchManager();
        searchManager.setKeyWords(keywords);
        Repository r=new YoutubeRepository(wsclient);
        Repository i=new InternetArchiveRepository(wsclient);
        List<Repository> repositories=new ArrayList<Repository>();
        repositories.add(r);
        //repositories.add(i);
        List<CompletionStage<List<MultimediaContent>>> dispatched=searchManager.dispatch(repositories);
        CompletionStage<List<MultimediaContent>> aggregated=searchManager.aggregate(dispatched);
        CompletionStage<QueryResult> transformedQuery=aggregated.thenApply( l -> {
            QueryResult qr=new QueryResult();
            qr.setKeyWords(keywords);
            qr.setMultimediaContents(l);
            qr.setUser(UserController.userDAO.findByUsername("ppanuccio"));
            return  qr;
        });
        transformedQuery.thenApply(p -> MongoDBService.getDatastore().save(p));
        CompletionStage<Result> promiseOfResult = transformedQuery.thenApply(( p ) -> ok(p.asJson()));
        return promiseOfResult;
    }

    private List<String> getKeyWords( JsonNode jsonRequest ) {
        List<String> keyWords = new ArrayList<String>();
        if(jsonRequest.get("keyWords").textValue()!=null && !jsonRequest.get("keyWords").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("keyWords").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("freeText").textValue()!=null && !jsonRequest.get("freeText").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("freeText").textValue().split(" ")).collect(Collectors.toList()));
        if(jsonRequest.get("semanticSearch").textValue()!=null && !jsonRequest.get("semanticSearch").textValue().isEmpty()) keyWords.addAll(Stream.of(jsonRequest.get("semanticSearch").textValue().split(" ")).collect(Collectors.toList()));

        return keyWords;
    }

}


