package models.dao;

import com.mongodb.MongoClient;
import models.Registration;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class RegistrationDAOImpl extends BasicDAO<Registration,ObjectId> implements RegistrationDAO {

    public RegistrationDAOImpl( Class<Registration> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public Registration get(String id) {
        return this.get(new ObjectId(id));
    }

    @Override
    public Registration findByName(String name) {
        return null;
    }

    @Override
    public List<Registration> findAll() {
        return this.find().asList();
    }
}
