package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Registration;
import models.dao.RegistrationDAO;
import models.dao.RegistrationDAOImpl;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 11/07/2017.
 */
public class RegistrationController extends Controller{

    public static RegistrationDAO registrationDAO=new RegistrationDAOImpl(Registration.class, MongoDBService.getDatastore());

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> get(String id){
        if(registrationDAO.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(registrationDAO.get(id))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Registration doesn't exists!"));
        }
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
}
