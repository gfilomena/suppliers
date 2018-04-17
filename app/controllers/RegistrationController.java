package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import com.fasterxml.jackson.databind.JsonNode;
import models.Registration;
import models.Repository;
import models.User;
import models.dao.*;
import org.bson.types.ObjectId;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.RegistrationService;
import services.RepositoryService;
import services.UserService;
import services.db.MongoDBService;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 11/07/2017.
 */
public class RegistrationController extends Controller{

    private RegistrationService registrationService=RegistrationService.getInstance();

    private UserService userService=new UserService();
    private RepositoryService repositoryService=new RepositoryService();

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> get(String id){
        if(registrationService.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(registrationService.get(id))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Registration doesn't exists!"));
        }
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        if (json.findPath("user").isMissingNode() || json.findPath("repository").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("User and Repository are mandatory!"));
        } else {
            String username = json.findPath("user").textValue();
            String repository = json.findPath("repository").textValue();
            Repository re = repositoryService.findByName(repository);
            User us = userService.findByUsername(username);
            if(re==null || us==null){
                return CompletableFuture.supplyAsync(() -> badRequest("User or Repository not present!"));
            }
            else {
                if (!registrationService.isPresent(us, re)) {
                    CompletableFuture<JsonNode> cf = CompletableFuture.supplyAsync(() -> {
                        Repository r = repositoryService.findByName(repository);
                        User u = userService.findByUsername(username);
                        Registration registration = new Registration();
                        registration.setRepository(r);
                        registration.setUser(u);
                        if (!json.findPath("apiKey").isMissingNode())
                            registration.setApiKey(json.findPath("apiKey").textValue());
                        if (!json.findPath("username").isMissingNode())
                            registration.setUsername(json.findPath("username").textValue());
                        if (!json.findPath("password").isMissingNode())
                            registration.setPassword(json.findPath("password").textValue());
                        if (!json.findPath("token").isMissingNode())
                            registration.setToken(json.findPath("token").textValue());
                        if (!json.findPath("enabled").isMissingNode())
                            registration.setEnabled(json.findPath("enabled").booleanValue());
                        registrationService.save(registration);
                        return registration.asJson();
                    });
                    return cf.thenApply(l -> created());
                } else {
                    return CompletableFuture.supplyAsync(() -> badRequest("Registration already exists!"));
                }
            }
        }
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> getAll(){
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(registrationService.findAll())));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> findRepositoriesByUser(){
        User user=Secured.getUser(ctx());
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(registrationService.findRepositoriesByUser(user))));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> findByUser(){
        User user=Secured.getUser(ctx());
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(registrationService.findRegistrationByUser(user))));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> update(String id){
        JsonNode json = request().body().asJson();
        if(registrationService.get(id)!=null) {
            Registration r=registrationService.get(id);
            if(!json.findPath("apiKey").isMissingNode()) r.setApiKey(json.findPath("apiKey").textValue());
            if(!json.findPath("username").isMissingNode()) r.setUsername(json.findPath("username").textValue());
            if(!json.findPath("password").isMissingNode()) r.setPassword(json.findPath("password").textValue());
            if(!json.findPath("token").isMissingNode()) r.setToken(json.findPath("token").textValue());
            if(!json.findPath("enabled").isMissingNode()) r.setEnabled(json.findPath("enabled").booleanValue());
            registrationService.save(r);
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(r)));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Registration doesn't exists!"));
        }
    }


    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String id){
        if(registrationService.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(registrationService.deleteById(new ObjectId(id)))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Registration doesn't exists!"));
        }
    }
}
