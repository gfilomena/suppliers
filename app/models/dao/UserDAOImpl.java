package models.dao;

import models.User;
import org.bson.types.ObjectId;
import org.mindrot.jbcrypt.BCrypt;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import play.Logger;
import services.MongoDBService;

import java.util.List;

/**
 * Created by Pasquale on 06/04/2017.
 */
public class UserDAOImpl extends BasicDAO<User, ObjectId> implements UserDAO {

    public UserDAOImpl( Class<User> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public User get( String id ) {
        Logger.info("User Id to remove:" + id);
        return MongoDBService.getDatastore().createQuery(User.class).filter("id = ", id).asList().get(0);
    }

    @Override
    public List<models.User> findAll() {
        return MongoDBService.getDatastore().createQuery(User.class).asList();
    }

    @Override
    public User findByUsername( String username ) {
        User user = null;
        List<User> list = MongoDBService.getDatastore().createQuery(User.class).filter("username = ", username).asList();
        if (list.size() == 1) {
            user = list.get(0);
            return user;
        } else
            return null;
    }

    @Override
    public User authenticate( String username, String password ) {
        User user = findByUsername(username);
        if (user != null && BCrypt.checkpw(password, user.getHashPassword())) {
            return user;
        } else {
            return null;
        }
    }


    @Override
    public void deleteUser( User user ) {
        MongoDBService.getDatastore().delete(user);
    }
}
