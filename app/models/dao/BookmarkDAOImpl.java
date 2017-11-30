package models.dao;

import com.mongodb.MongoClient;
import models.Bookmark;
import models.MultimediaContent;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import services.db.MongoDBService;

import java.awt.print.Book;
import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class BookmarkDAOImpl extends BasicDAO<Bookmark,ObjectId> implements BookmarkDAO {

    public BookmarkDAOImpl( Class<Bookmark> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public Bookmark get( String id ) {
        return this.get(new ObjectId(id));
    }

    @Override
    public List<Bookmark> findByUser(User user) {
        return this.find(MongoDBService.getDatastore().createQuery(Bookmark.class).filter("user = ", user))
                .asList();
    }

    @Override
    public List<Bookmark> findAll() {
        return this.find().asList();
    }

    @Override
    public boolean isPresent(User user, MultimediaContent mc) {
        Bookmark bookmark=this.findOne(MongoDBService.getDatastore().createQuery(Bookmark.class).filter("user = ", user).filter("multimediaContent = ", mc));
        if(bookmark!=null)
            return true;
        else
            return false;
    }

    @Override
    public void deleteAllByUser(User user) {
        Query<Bookmark> query=MongoDBService.getDatastore().createQuery(Bookmark.class).filter("user = ", user);
        MongoDBService.getDatastore().delete(query);
    }

    @Override
    public void deleteByIds(List<String> idsToRemove) {
        Query<Bookmark> query=MongoDBService.getDatastore().createQuery(Bookmark.class).filter("_id in ", idsToRemove);
        MongoDBService.getDatastore().delete(query);
    }

}
