package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import com.fasterxml.jackson.databind.JsonNode;
import exceptions.BookmarkNotFoundException;
import exceptions.UserNotFoundException;
import models.*;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.BookmarkService;
import services.MultimediaContentService;
import services.RepositoryService;
import services.UserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


/**
 * Created by Pasquale on 13/07/2017.
 */
public class BookmarkController extends Controller {

    private BookmarkService bookmarkService = new BookmarkService();
    private UserService userService = new UserService();
    private RepositoryService repositoryService = new RepositoryService();
    private MultimediaContentService multimediaContentService = new MultimediaContentService();


    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> get(String id) {
        final Bookmark b;
        try {
            b = bookmarkService.getBookmark(id);
        } catch (BookmarkNotFoundException e) {
            return CompletableFuture.supplyAsync(() -> notFound(e.getMessage()));
        }
        return CompletableFuture.supplyAsync(() -> ok(Json.toJson(b)));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> findByUser() {
        User user;
        try {
            user = userService.getUserFromHttpContext(ctx());
        } catch (UserNotFoundException e) {
            return CompletableFuture.supplyAsync(() -> notFound(e.getMessage()));
        }
        List<Bookmark> bookmarkList = bookmarkService.getBookmarksByUser(user);
        return CompletableFuture.supplyAsync(() -> ok(Json.toJson(bookmarkList)));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> getAll() {
        List<Bookmark> bookmarkList = bookmarkService.getAllBookmarks();
        return CompletableFuture.supplyAsync(() -> ok(Json.toJson(bookmarkList)));
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        if (json.findPath("user").isMissingNode() || json.findPath("multimediaContent").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("User and MultimediaContent are mandatory!"));
        } else {
            final User user;
            try {
                user = userService.getUser(json.findPath("user").textValue());
            } catch (UserNotFoundException e) {
                return CompletableFuture.supplyAsync(() -> notFound(e.getMessage()));
            }
            MultimediaContent mc = new MultimediaContent();
            if (!json.findPath("type").isMissingNode())
                mc.setType(MultimediaType.valueOf(json.findPath("type").textValue()));
            if (!json.findPath("fileExtension").isMissingNode())
                mc.setFileExtension(json.findPath("fileExtension").textValue());
            if (!json.findPath("length").isMissingNode()) mc.setLength(json.findPath("length").longValue());
            if (!json.findPath("name").isMissingNode()) mc.setName(json.findPath("name").textValue());
            if (!json.findPath("description").isMissingNode())
                mc.setDescription(json.findPath("description").textValue());
            if (!json.findPath("thumbnail").isMissingNode()) mc.setThumbnail(json.findPath("thumbnail").textValue());
            if (!json.findPath("downloadURI").isMissingNode())
                mc.setDownloadURI(json.findPath("downloadURI").textValue());
            if (json.findPath("source").isMissingNode()) {
                return CompletableFuture.supplyAsync(() -> badRequest("Source for MultimediaContent is mandatory!"));
            } else {
                Repository r = repositoryService.get(json.findPath("source").findPath("id").textValue());
                mc.setSource(r);
            }
            //if(!json.findPath("date").isMissingNode()) mc.setDate(json.findPath("date"));

            if (!json.findPath("metadata").isMissingNode())
                mc.setMetadata(JsonNodetoArrayList(json.findPath("metadata")));
            if (!json.findPath("uri").isMissingNode()) mc.setURI(json.findPath("uri").textValue());
            multimediaContentService.save(mc);
            if (!bookmarkService.bookmarkExists(user, mc)) {
                CompletableFuture<JsonNode> cf = CompletableFuture.supplyAsync(() -> {
                    Bookmark b = new Bookmark();
                    b.setUser(user);
                    b.setMultimediaContent(mc);
                    b.setDate(new Date());
                    bookmarkService.save(b);
                    return b.asJson();
                });
                return cf.thenApply(l -> created());
            } else {
                return CompletableFuture.supplyAsync(() -> badRequest("Bookmark already exists!"));
            }
        }
    }

    private String[] JsonNodetoArrayList(JsonNode arrNode) {

        ArrayList<String> arr = new ArrayList<String>();
        if (arrNode.isArray()) {
            for (final JsonNode objNode : arrNode) {
                arr.add(objNode.textValue());
            }
        }
        String[] res = arr.toArray(new String[arr.size()]);
        ;
        return res;

    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> delete(String ids) {
        List<String> idsToRemove = Arrays.asList(ids.split(","));
        if (idsToRemove.size() == 0) {
            return CompletableFuture.supplyAsync(() -> notFound("No Bookmark's ids provided!"));
        } else if (idsToRemove.size() == 1) {
            Bookmark b;
            try {
                b = bookmarkService.getBookmark(idsToRemove.get(0));
            } catch (BookmarkNotFoundException e) {
                return CompletableFuture.supplyAsync(() -> notFound("The Bookmark doesn't exists!"));
            }
            // TODO also delete Multimedia Content related
            return CompletableFuture.supplyAsync(() -> noContent());
        } else {
            return CompletableFuture.supplyAsync(() -> {
                idsToRemove.stream()
                        .forEach(id -> bookmarkService.deleteById(id));
                return noContent();
            });
        }
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> deleteAllByUser() {
        User user;
        try {
            user = userService.getUserFromHttpContext(ctx());
        } catch (UserNotFoundException e) {
            return CompletableFuture.supplyAsync(() -> notFound(e.getMessage()));
        }
        bookmarkService.deleteAllByUser(user);
        return CompletableFuture.supplyAsync(() -> ok());
    }

}
