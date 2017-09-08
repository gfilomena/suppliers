package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import models.dao.*;
import org.bson.types.ObjectId;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;
import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


/**
 * Created by Pasquale on 13/07/2017.
 */
public class BookmarkController extends Controller{

    public static BookmarkDAO bookmarkDAO=new BookmarkDAOImpl(Bookmark.class, MongoDBService.getDatastore());
    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());
    public static MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class, MongoDBService.getDatastore());
    public static RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class, MongoDBService.getDatastore());

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
            return CompletableFuture.supplyAsync(() -> badRequest("User and MultimediaContent are mandatory!"));
        } else {
            User user = userDAO.findByUsername(json.findPath("user").textValue());
            MultimediaContent mc=new MultimediaContent();
            if(!json.findPath("type").isMissingNode()) mc.setType(MultimediaType.valueOf(json.findPath("type").textValue()));
            if(!json.findPath("fileExtension").isMissingNode()) mc.setFileExtension(json.findPath("fileExtension").textValue());
            if(!json.findPath("length").isMissingNode()) mc.setLength(json.findPath("length").longValue());
            if(!json.findPath("name").isMissingNode()) mc.setName(json.findPath("name").textValue());
            if(!json.findPath("description").isMissingNode()) mc.setDescription(json.findPath("description").textValue());
            if(!json.findPath("thumbnail").isMissingNode()) mc.setThumbnail(json.findPath("thumbnail").textValue());
            if(!json.findPath("downloadURI").isMissingNode()) mc.setDownloadURI(json.findPath("downloadURI").textValue());
            if(json.findPath("source").isMissingNode()){
                return CompletableFuture.supplyAsync(() -> badRequest("Source for MultimediaContent is mandatory!"));
            }else{
                mc.setSource(repoDAO.get(json.findPath("source").findPath("id").textValue()));
            }
            //if(!json.findPath("date").isMissingNode()) mc.setDate(json.findPath("date"));
            
            if(!json.findPath("metadata").isMissingNode()) mc.setMetadata(JsonNodetoArrayList(json.findPath("metadata")));
            if(!json.findPath("uri").isMissingNode()) mc.setURI(json.findPath("uri").textValue());
            multimediaContentDAO.save(mc);
            if (!bookmarkDAO.isPresent(user, mc)) {
                CompletableFuture<JsonNode> cf = CompletableFuture.supplyAsync(() -> {
                    Bookmark b = new Bookmark();
                    b.setUser(user);
                    b.setMultimediaContent(mc);
                    b.setDate(new Date());
                    bookmarkDAO.save(b);
                    return b.asJson();
                });
                return cf.thenApply(l -> created());
            } else {
                return CompletableFuture.supplyAsync(() -> badRequest("Bookmark already exists!"));
            }
            /*MultimediaContent mc = multimediaContentDAO.get(json.findPath("multimediaContent").textValue());
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
            }*/
        }
    }
    
    private String[] JsonNodetoArrayList(JsonNode arrNode) {

    	ArrayList<String> arr = new ArrayList<String>();
    	if (arrNode.isArray()) {
    	    for (final JsonNode objNode : arrNode) {
    	       arr.add(objNode.textValue());
    	    }
    	}
    	String[] res = arr.toArray(new String[arr.size()]);;
		return res;

    }


    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String id){
        if(bookmarkDAO.get(id)!=null) {
            // TODO also delete Multimedia Content related
            return CompletableFuture.supplyAsync(() -> ok(Json.toJson(bookmarkDAO.deleteById(new ObjectId(id)))));
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Bookmark doesn't exists!"));
        }
    }

    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> deleteAllByUser(){
        User user=Secured.getUser(ctx());
        if(user!=null) {
            bookmarkDAO.deleteAllByUser(user);
            return CompletableFuture.supplyAsync(() -> ok());
        }
        else{
            return CompletableFuture.supplyAsync(() -> notFound("The Username doesn't exists!"));
        }
    }
    

}
