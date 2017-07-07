package models.dao;

import com.mongodb.MongoClient;
import models.Bookmark;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class BookmarkDAOImpl extends BasicDAO<Bookmark,ObjectId> implements BookmarkDAO {

    public BookmarkDAOImpl( Class<Bookmark> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }
}
