package models.dao;

import com.mongodb.MongoClient;
import models.Repository;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import services.MongoDBService;

/**
 * Created by Pasquale on 07/06/2017.
 */
public class RepositoryDAOImpl extends BasicDAO<Repository,ObjectId> implements RepositoryDAO {

    public RepositoryDAOImpl( Class<Repository> entityClass, MongoClient mongoClient, Morphia morphia, String dbName ) {
        super(entityClass, mongoClient, morphia, dbName);
    }

    @Override
    public Repository get( String id ) {
        return MongoDBService.getDatastore().createQuery(Repository.class).filter("name = ", id).asList().get(0);
    }
}
