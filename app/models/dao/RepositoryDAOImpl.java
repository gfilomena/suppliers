package models.dao;

import com.mongodb.MongoClient;
import models.Repository;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import services.db.MongoDBService;

import java.util.List;

/**
 * Created by Pasquale on 07/06/2017.
 */
public class RepositoryDAOImpl extends BasicDAO<Repository,ObjectId> implements RepositoryDAO {

    public RepositoryDAOImpl( Class<Repository> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public Repository get( String id ) {
        return this.get(new ObjectId(id));
    }

    @Override
    public Repository findByName(String name) {
        return this.findOne("name",name);
    }

    @Override
    public List<Repository> findAll() {
        return this.find().asList();
    }

}
