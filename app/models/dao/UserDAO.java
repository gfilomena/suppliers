package models.dao;

import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 06/04/2017.
 */
public interface UserDAO extends DAO<User, ObjectId>{

     User get(String id);

    List<User> findAll();

    User findByUsername(String username);

    User authenticate(String username, String password);

    void deleteUser(User user);

}
