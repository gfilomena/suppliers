package services;

import controllers.Secured;
import exceptions.UserNotFoundException;
import models.User;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
import play.Logger;
import play.mvc.Http;
import services.db.MongoDBService;

import java.util.concurrent.CompletionStage;

public class UserService {

    private UserDAO userDAO=new UserDAOImpl(User.class, MongoDBService.getDatastore());

    public User getUser(String username) throws UserNotFoundException {
        User user = userDAO.findByUsername(username);
        if(user==null){
            String message="The User with username: "+username+" was not found on DB";
            Logger.debug(message);
            throw new UserNotFoundException(message);
        }
        return user;
    }

    public User getUserFromHttpContext(Http.Context ctx) throws UserNotFoundException{
        User user=Secured.getUser(ctx);
        if(user==null){
            String message="The User from the Http Context was not found on DB";
            Logger.debug(message);
            throw new UserNotFoundException(message);
        }
        return user;
    }

    public User findByUsername(String username) {
        return userDAO.findByUsername(username);
    }
}
