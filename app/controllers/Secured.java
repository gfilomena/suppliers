package controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.typesafe.config.ConfigFactory;
import models.User;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;

import java.io.UnsupportedEncodingException;

public class Secured extends Security.Authenticator {

    public static UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());

    @Override
    public String getUsername(Context ctx) {
        String[] authTokenHeaderValues = ctx.request().headers().get(UserController.AUTH_TOKEN_HEADER);
        if ((authTokenHeaderValues != null) && (authTokenHeaderValues.length == 1) && (authTokenHeaderValues[0] != null)) {
            String token=authTokenHeaderValues[0].split(" ")[1];
            try {
                Algorithm algorithm = Algorithm.HMAC256(ConfigFactory.load().getString("play.crypto.secret"));
                JWTVerifier verifier = JWT.require(algorithm)
                        .build(); //Reusable verifier instance
                DecodedJWT jwt = verifier.verify(token);
                String issuer = jwt.getIssuer();
                User user = userDAO.findByUsername(issuer);
                if (user != null) {
                    return user.getUsername();
                }
            } catch (UnsupportedEncodingException exception){
                return null;
            } catch (JWTVerificationException exception){
                return null;
            }
        }
        return null;
    }

    @Override
    public Result onUnauthorized(Context ctx) {
        return unauthorized();
    }


}