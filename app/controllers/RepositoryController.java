package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Repository;
import models.dao.RepositoryDAO;
import models.dao.RepositoryDAOImpl;
import org.bson.types.ObjectId;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 06/07/2017.
 */
public class RepositoryController extends Controller {

    public static RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class, MongoDBService.getDatastore());

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> get(String id){
        if(repoDAO.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(repoDAO.get(id))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Repository doesn't exists!"));
        }
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> getAll(){
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(repoDAO.findAll())));
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> create(){
        JsonNode json = request().body().asJson();
        if(json.findPath("name").isMissingNode() || json.findPath("uri").isMissingNode()){
            return  CompletableFuture.supplyAsync( () -> badRequest("Name and URI are mandatory!"));
        }
        else if(repoDAO.findByName(json.findPath("name").textValue())==null) {
            CompletableFuture<JsonNode> cf=CompletableFuture.supplyAsync( () -> {Repository r = new Repository();
                r.setName(json.findPath("name").textValue());
                r.setURI(json.findPath("uri").textValue());
                if(!json.findPath("urlPrefix").isMissingNode())
                    r.setUrlPrefix(json.findPath("urlPrefix").textValue());
                repoDAO.save(r);
            return r.asJson();});
            return cf.thenApply( l -> created());
        }
        else{
            return CompletableFuture.supplyAsync( () -> badRequest("Repository already exists!"));
        }
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> update(String id){
        JsonNode json = request().body().asJson();
        if(repoDAO.get(id)!=null) {
            Repository r=repoDAO.get(id);
            if(!json.findPath("name").isMissingNode()) r.setName(json.findPath("name").textValue());
            if(!json.findPath("uri").isMissingNode()) r.setURI(json.findPath("uri").textValue());
            if(!json.findPath("urlPrefix").isMissingNode()) r.setUrlPrefix(json.findPath("urlPrefix").textValue());
            repoDAO.save(r);
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(r)));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Repository doesn't exists!"));
        }
    }


    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String id){
        if(repoDAO.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(repoDAO.deleteById(new ObjectId(id)))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Repository doesn't exists!"));
        }
    }
}
