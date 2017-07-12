package models.dao;

import models.Registration;
import models.Repository;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public interface RegistrationDAO extends DAO<Registration, ObjectId> {

    Registration get(String id);

    Registration findByName(String name);

    List<Registration> findAll();

    boolean isPresent(User username, Repository repository);

    List<Repository> findByUser(User user);
}
