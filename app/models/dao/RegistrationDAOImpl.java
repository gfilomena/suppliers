package models.dao;

import com.mongodb.MongoClient;
import models.Registration;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class RegistrationDAOImpl extends BasicDAO<Registration,ObjectId> implements RegistrationDAO {

    public RegistrationDAOImpl( Class<Registration> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }
}
