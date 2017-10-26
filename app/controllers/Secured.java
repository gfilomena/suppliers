package controllers;

import com.auth0.jwk.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.typesafe.config.ConfigFactory;
import exceptions.ValidationJWTException;
import models.User;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;
import utils.SecurityUtils;

import java.io.UnsupportedEncodingException;
import java.security.interfaces.RSAPublicKey;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public class Secured extends Security.Authenticator {

    public static UserDAO userDAO = new UserDAOImpl(User.class, MongoDBService.getDatastore());

    @Override
    public String getUsername(Context ctx) {
        User user = getUser(ctx);
        if (user != null) {
            return user.getUsername();
        } else {
            return null;
        }
    }

    @Override
    public Result onUnauthorized(Context ctx) {
        return unauthorized();
    }


    public static User getUser(Context ctx) {
        String[] authTokenHeaderValues = ctx.request().headers().get(UserController.AUTH_TOKEN_HEADER);
        if ((authTokenHeaderValues != null) && (authTokenHeaderValues.length == 1) && (authTokenHeaderValues[0] != null)) {
            String token = authTokenHeaderValues[0].split(" ")[1];
            DecodedJWT jwt= null;
            try {
                jwt = SecurityUtils.verifyAndDecodeJWTToken(token,"https://pasquydomain.eu.auth0.com/","auth0");
            } catch (ValidationJWTException e) {
                return null;
            }
            String subject=jwt.getSubject();
            if(!subject.isEmpty()) {
                User user = userDAO.findByUserId(subject);
                if (user != null) {
                    return user;
                } else {
                    User newUser = new User();
                    newUser.setUserId(subject);
                    newUser.setUsername(subject); // TODO set properly the Username of the User if possible. Leave here for testing purpose
                    newUser.setAccess_token(token);
                    userDAO.save(newUser);
                    return newUser;
                }
            }
        }
        return null;
    }

}