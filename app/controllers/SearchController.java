package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import com.fasterxml.jackson.databind.JsonNode;
import exceptions.MultimediaSearchServiceException;
import exceptions.UserNotFoundException;
import models.*;
import play.Logger;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.libs.ws.WSClient;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.SearchService;
import services.MultimediaSearchService;
import services.UserService;

import javax.inject.Inject;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class SearchController extends Controller {

    private HttpExecutionContext ec;
    private SearchService multimediaSearchService;
    private UserService userService;
    private WSClient wsclient;


    @Inject
    public SearchController(HttpExecutionContext ec, WSClient wsClient){
        this.ec=ec;
        this.wsclient=wsClient;
        multimediaSearchService =new MultimediaSearchService(wsclient);
        userService=new UserService();
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> search() {
        JsonNode jsonRequest = request().body().asJson();
        User user=Secured.getUser(ctx());
        Logger.info("OCD search received: " + jsonRequest.toString());

        CompletionStage<SearchResult> searchResults=multimediaSearchService.search(jsonRequest, user);
        CompletionStage<JsonNode> jsonResult=searchResults.thenApply(p -> {
            //multimediaSearchService.saveSearchResult(p);
            return p.asJson();});
        searchResults.thenAccept(p->multimediaSearchService.saveSearchResult(p));
        CompletionStage<Result> promiseOfResult = jsonResult.thenApply(( p ) -> ok(p));
        return promiseOfResult;

    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> getSearchResults(String username){
        User user= null;
        try {
            user = userService.getUser(username);
        } catch (UserNotFoundException e) {
            return CompletableFuture.supplyAsync(() -> notFound("The Username doesn't exists!"));
        }
        return multimediaSearchService.getSearchResultsByUser(user).thenApply( sr -> ok(Json.toJson(sr)));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String username, String ids){
        if(username==null){
            return CompletableFuture.supplyAsync(() -> badRequest("The Username should be specified!"));
        }
        else {
            User user = null;
            try {
                user = userService.getUser(username);
            } catch (UserNotFoundException e) {
                return CompletableFuture.supplyAsync(() -> notFound("The Username doesn't exists!"));
            }
            try {
                multimediaSearchService.deleteSearchResultsByIds(ids);
            } catch (UserNotFoundException e) {
                return CompletableFuture.supplyAsync(() -> notFound(e.getMessage()));
            } catch (MultimediaSearchServiceException e) {
                return CompletableFuture.supplyAsync(() -> badRequest(e.getMessage()));
            }
            return CompletableFuture.supplyAsync(() -> ok("The Search Results items are deleted successfully"));
        }
    }



}


