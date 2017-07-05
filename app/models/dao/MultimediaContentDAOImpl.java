package models.dao;

import com.mongodb.MongoClient;
import models.MultimediaContent;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class MultimediaContentDAOImpl extends BasicDAO<MultimediaContent,ObjectId> implements MultimediaContentDAO {

    public MultimediaContentDAOImpl( Class<MultimediaContent> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }
}
