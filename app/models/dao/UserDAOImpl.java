package models.dao;

import models.User;
import org.bson.types.ObjectId;
import org.mindrot.jbcrypt.BCrypt;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import play.Logger;
import services.db.MongoDBService;

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
        return this.get(new ObjectId(id));
    }

    @Override
    public List<User> findAll() {
        return this.find().asList();
    }

    @Override
    public User findByUsername( String username ) {
        return this.findOne("username", username);
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
}
