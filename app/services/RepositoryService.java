package services;

import models.Repository;
import models.dao.RepositoryDAO;
import models.dao.RepositoryDAOImpl;
import services.db.MongoDBService;

public class RepositoryService {

    private RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class, MongoDBService.getDatastore());

    public Repository get(String id){
        return repoDAO.get(id);
    }
}
