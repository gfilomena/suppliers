package services;

import com.mongodb.WriteResult;
import models.Repository;
import models.dao.RepositoryDAO;
import models.dao.RepositoryDAOImpl;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Key;
import services.db.MongoDBService;

import java.util.List;

public class RepositoryService {

    private RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class, MongoDBService.getDatastore());

    public Repository get(String id){
        return repoDAO.get(id);
    }

    public Repository findByName(String repository) {
        return repoDAO.findByName(repository);
    }

    public List<Repository> findAll() {
        return repoDAO.findAll();
    }

    public Key<Repository> save(Repository r) {
        return repoDAO.save(r);
    }

    public WriteResult deleteById(ObjectId objectId) {
        return repoDAO.deleteById(objectId);
    }
}
