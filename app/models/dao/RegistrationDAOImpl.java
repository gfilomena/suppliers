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
import java.util.stream.Collectors;

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
    public boolean isPresent(User user, Repository repository) {
        Registration reg=this.findOne(MongoDBService.getDatastore().createQuery(Registration.class).filter("user = ", user).filter("repository = ", repository));
        if(reg!=null)
            return true;
        else
            return false;
    }

    @Override
    public List<Repository> findByUser(User user) {
        return this.find(MongoDBService.getDatastore().createQuery(Registration.class).filter("user = ", user))
                .asList()
                .stream()
                .map(r -> r.getRepository()).collect(Collectors.toList());
    }


}
