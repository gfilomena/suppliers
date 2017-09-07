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
import play.Logger;

import java.io.IOException;
import java.util.Date;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import services.nuxeo.NuxeoService;
/**
 * Created by Giuseppe on 01/09/2017.
 */
public class McssrController extends Controller{


    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());




	@Security.Authenticated(Secured.class)
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        Logger.info("json:"+json);
        JsonNode params = json.findPath("params");
        //Logger.info("params->"+params);
        JsonNode user = json.findPath("user");
        //Logger.info("user->"+user);
        NuxeoService ws = new NuxeoService();
        String url;
        String body;
        CompletionStage<JsonNode> r;
        
        if (json.findPath("params").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("params not presents!"));
        }else {
        	params = json.findPath("params");
        }
        
        if (json.findPath("user").isMissingNode()) {
            return CompletableFuture.supplyAsync(() -> badRequest("User is mandatory!"));
        } else {
            String username = json.findPath("user").textValue();
            User us = userDAO.findByUsername(username);
            if( us==null){
                return CompletableFuture.supplyAsync(() -> badRequest("User not present!"));
            }
            if(params.findPath("url").isMissingNode()){
                return CompletableFuture.supplyAsync(() -> badRequest("url not present!"));
            }
            if(params.findPath("fileName").isMissingNode()){
                return CompletableFuture.supplyAsync(() -> badRequest("fileName not present!"));
            }
            if(params.findPath("mimeType").isMissingNode()){
                return CompletableFuture.supplyAsync(() -> badRequest("mimeType not present!"));
            }
            if(params.findPath("type").isMissingNode()){
                return CompletableFuture.supplyAsync(() -> badRequest("type not present!"));
            }
            //Logger.info("create->"+ws.create(json));
           
        }
        r = ws.create(json);
        if(r != null) {
            return r.thenApply(( p ) -> ok(p));
        }
        else{
            return CompletableFuture.supplyAsync(() -> badRequest("ws.create(json) -> error!"));
        }
       
		
	
    }


    


}
