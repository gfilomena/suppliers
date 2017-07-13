package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Bookmark;
import models.MultimediaContent;
import models.User;
import models.dao.*;
import org.bson.types.ObjectId;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 13/07/2017.
 */
public class BookmarkController extends Controller{

    public static BookmarkDAO bookmarkDAO=new BookmarkDAOImpl(Bookmark.class, MongoDBService.getDatastore());
    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());
    public static MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class, MongoDBService.getDatastore());

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> get(String id){
        if(bookmarkDAO.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(bookmarkDAO.get(id))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Bookmark doesn't exists!"));
        }
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> findByUser(){
        User user=Secured.getUser(ctx());
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(bookmarkDAO.findByUser(user))));
    }


    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> getAll(){
        return CompletableFuture.supplyAsync( () -> ok(Json.toJson(bookmarkDAO.findAll())));
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        if (json.findPath("user").isMissingNode() || json.findPath("multimediaContent").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("Name and URI are mandatory!"));
        } else {
            User user = userDAO.findByUsername(json.findPath("user").textValue());
            MultimediaContent mc = multimediaContentDAO.get(json.findPath("multimediaContent").textValue());
            if (user == null || mc == null) {
                return CompletableFuture.supplyAsync(() -> badRequest("User and Multimedia Content doesn't exists!"));
            } else if (!bookmarkDAO.isPresent(user, mc)) {
                CompletableFuture<JsonNode> cf = CompletableFuture.supplyAsync(() -> {
                    Bookmark b = new Bookmark();
                    b.setUser(user);
                    b.setMultimediaContent(mc);
                    bookmarkDAO.save(b);
                    return b.asJson();
                });
                return cf.thenApply(l -> created());
            } else {
                return CompletableFuture.supplyAsync(() -> badRequest("Bookmark already exists!"));
            }
        }
    }


    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String id){
        if(bookmarkDAO.get(id)!=null) {
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(bookmarkDAO.deleteById(new ObjectId(id)))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Bookmark doesn't exists!"));
        }
    }
}
