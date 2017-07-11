package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Registration;
import models.Repository;
import models.User;
import models.dao.*;
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
    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());
    public static RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class, MongoDBService.getDatastore());

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
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        if (json.findPath("user").isMissingNode() || json.findPath("repository").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("user and repository are mandatory!"));
        } else {
            String username = json.findPath("user").textValue();
            String repository = json.findPath("repository").textValue();
            if (!registrationDAO.isPresent(username, repository)) {
                CompletableFuture<JsonNode> cf = CompletableFuture.supplyAsync(() -> {
                    Repository r = repoDAO.findByName(repository);
                    User u = userDAO.findByUsername(username);
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
                        registration.setEnabled(json.findPath("enabled").textValue().equals("true") ? true : false);
                    registrationDAO.save(registration);
                    return registration.asJson();
                });
                return cf.thenApply(l -> created());
            } else {
                return CompletableFuture.supplyAsync(() -> badRequest("Registration already exists!"));
            }
        }
    }
}
