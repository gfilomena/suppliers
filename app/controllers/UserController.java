package controllers;

import com.auth0.client.auth.AuthAPI;
import com.auth0.exception.APIException;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.net.AuthRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import common.ConfigObj;
import models.RoleType;
import models.User;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
import play.Logger;
import play.libs.Json;
import play.mvc.*;
import services.db.MongoDBService;
import views.html.index;

import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class UserController extends Controller {

    public final static String AUTH_TOKEN_HEADER = "Authorization";

    public static com.typesafe.config.Config CONFIG=ConfigFactory.load();

    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());



    public Result index() {
        /**
         * index()  :    does no ts compilation in advance. the ts files are download by the browser and compiled there to js.
         */
        return ok(index.render());
    }


    @BodyParser.Of(BodyParser.Json.class)
    public Result authenticate(){
        JsonNode json = request().body().asJson();
        String username = json.findPath("username").textValue();
        String password = json.findPath("password").textValue();
        if(username == null || password ==null) {
            return badRequest("Missing parameter [username] & [password]");
        } else {
            User user = userDAO.authenticate(username,password);
            if (user != null) {
                String token=null;
                Date now=Date.from(Instant.now());
                Date expires_at=Date.from(now.toInstant().plus(2,ChronoUnit.HOURS));
                try {
                    Algorithm algorithm = Algorithm.HMAC256(ConfigObj.configuration.getString("play.crypto.secret"));
                    token = JWT.create()
                            .withIssuer(ConfigObj.configuration.getString("authentication.ocd.issuer"))
                            .withSubject(user.getUserId())
                            .withIssuedAt(now)
                            .withExpiresAt(expires_at)
                            .sign(algorithm);
                    user.setToken(token);
                } catch (UnsupportedEncodingException exception) {
                    return badRequest("UTF-8 encoding not supported");//UTF-8 encoding not supported
                } catch (JWTCreationException exception) {
                    return badRequest("Invalid Signing configuration / Couldn't convert Claims.");//Invalid Signing configuration / Couldn't convert Claims.
                }
                /*session("currentUser", user.getUsername());
                ObjectNode authTokenJson = Json.newObject();
                authTokenJson.put("_id", user.getId().toString());
                authTokenJson.put("username", user.getUsername());
                authTokenJson.put("firstName", user.getFirstName());
                authTokenJson.put("lastName", user.getLastName());
                authTokenJson.put("token", user.getToken());*/
                //response().setCookie(Http.Cookie.builder(AUTH_TOKEN, user.getToken()).withSecure(ctx().request().secure()).build());
                ObjectNode authTokenJson = Json.newObject();
                authTokenJson.put("accessToken", token);
                authTokenJson.put("idToken", token);
                authTokenJson.put("expiresAt", expires_at.getTime());
                return ok(Json.toJson(authTokenJson));
            } else {
                return badRequest("No User available with such username.");
            }
        }
    }

    @BodyParser.Of(BodyParser.Json.class)
    public Result register(){
        JsonNode json = request().body().asJson();
        String username = json.findPath("username").textValue();
        if(json.findPath("username").textValue() == null || json.findPath("password").textValue()==null) {
            return badRequest("Missing required parameters");
        } else {
            if (userDAO.findByUsername(username) != null) {
                return badRequest("Username already taken.");
            } else {
                User user=new User(json.findPath("username").textValue(),json.findPath("password").textValue(),json.findPath("firstName").textValue(),json.findPath("lastName").textValue(),json.findPath("email").textValue(), RoleType.USER );
                user.setUserId(json.findPath("username").textValue());
                userDAO.save(user);
                return created();
            }
        }
    }

    @Security.Authenticated(Secured.class)
    public Result getAll(){
        return ok(Json.toJson(userDAO.findAll()));
    }

    @Security.Authenticated(Secured.class)
    public User getCurrent(){
        return (User)Http.Context.current().args.get("user");
    }

    @Security.Authenticated(Secured.class)
    public Result get(String username){
        return ok(Json.toJson(userDAO.findByUsername(username)));
    }

    @Security.Authenticated(Secured.class)
    @BodyParser.Of(BodyParser.Json.class)
    public Result update(String username){
        JsonNode json = request().body().asJson();
        User userToUpdate=userDAO.findByUsername(username);
        if(!json.findPath("firstName").isMissingNode()) userToUpdate.setFirstName(json.findPath("firstName").textValue());
        if(!json.findPath("lastName").isMissingNode()) userToUpdate.setLastName(json.findPath("lastName").textValue());
        if(!json.findPath("email").isMissingNode()) userToUpdate.setEmail(json.findPath("email").textValue());
        userDAO.save(userToUpdate);
        return ok();
    }

    @Security.Authenticated(Secured.class)
    public Result delete(String username){
        Logger.debug("delete user with username:"+username);
        userDAO.delete(userDAO.findByUsername(username));
        return noContent();
    }

    @Security.Authenticated(Secured.class)
    public Result logout() {
        User u=getCurrent();
        u.setToken(null);
        MongoDBService.getDatastore().save(u);
        session().clear();
        return redirect("/");
    }

    public CompletionStage<Result> authorize(){
        /*UserService userservice=new UserService();
        return userservice.authorize().thenApply(p -> red(p.asJson()));*/
        return null;

    }

    /*public CompletionStage<Result> login(){
        AuthAPI authAPI=new AuthAPI(CONFIG.getString("auth0.domain"),CONFIG.getString("auth0.clientID"),CONFIG.getString("auth0.clientSecret"));
        String url = authAPI.authorizeUrl("http://localhost:9000/callback")
                .withAudience("https://pasquydomain.eu.auth0.com/api/v2/")
                .withScope("openid")
                .withState("STATE")
                .withResponseType("code")
                .build();
        Logger.debug("Redirected to: "+url);
        return CompletableFuture.supplyAsync(() -> redirect(url));
    }

    public CompletionStage<Result> callback(String code, String state){
        AuthAPI authAPI=new AuthAPI(CONFIG.getString("auth0.domain"),CONFIG.getString("auth0.clientID"),CONFIG.getString("auth0.clientSecret"));
        AuthRequest request = authAPI.exchangeCode(code, "http://localhost:9000/callback")
                .setAudience("https://pasquydomain.eu.auth0.com/api/v2/")
                .setScope("openid");
        HashMap<String,Object> response=new HashMap<>();
        try {
            TokenHolder holder = request.execute();
            response.put("access_token",holder.getAccessToken());
            response.put("id_token",holder.getIdToken());
            response.put("expires_in",holder.getExpiresIn());
            response.put("token_type",holder.getTokenType());
            session("access_token",holder.getAccessToken());
            session("id_token",holder.getIdToken());
            session("expires_in",String.valueOf(holder.getExpiresIn()));
            session("token_type",holder.getTokenType());
        } catch (APIException exception) {
            // api error
        } catch (Auth0Exception exception) {
            // request error
        }
        return CompletableFuture.supplyAsync(() -> redirect(routes.UserController.index()));
    }*/
}
