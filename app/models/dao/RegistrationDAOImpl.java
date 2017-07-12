package models.dao;

import com.mongodb.MongoClient;
import com.mongodb.QueryBuilder;
import models.Registration;
import models.Repository;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import services.db.MongoDBService;

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

    @Override
    public boolean isPresent(User username, Repository repository) {
        Registration reg=this.findOne(MongoDBService.getDatastore().createQuery(Registration.class).filter("user = ", username).filter("repository = ", repository));
        if(reg!=null)
            return true;
        else
            return false;
    }
}
