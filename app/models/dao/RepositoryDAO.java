package models.dao;

import models.Repository;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

/**
 * Created by Pasquale on 07/06/2017.
 */
public interface RepositoryDAO extends DAO<Repository, ObjectId> {

    Repository get(String id);

}
