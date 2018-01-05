package models.dao;

import com.mongodb.MongoClient;
import models.MultimediaContent;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import services.db.MongoDBService;

import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public class MultimediaContentDAOImpl extends BasicDAO<MultimediaContent,ObjectId> implements MultimediaContentDAO {

    public MultimediaContentDAOImpl( Class<MultimediaContent> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public MultimediaContent get(String id) {
        return this.get(new ObjectId(id));
    }

    @Override
    public List<MultimediaContent> findBySource(String source) {
        return this.find(MongoDBService.getDatastore().createQuery(MultimediaContent.class).filter("source", source)).asList();
    }

    @Override
    public List<MultimediaContent> findByType(String type) {
        return this.find(MongoDBService.getDatastore().createQuery(MultimediaContent.class).filter("type", type)).asList();
    }

    @Override
    public void saveAll(List<MultimediaContent> multimediaContents) {
        multimediaContents.stream().forEach(l -> this.save(l));
    }

    @Override
    public void deleteAll() {
        Query<MultimediaContent> query=MongoDBService.getDatastore().createQuery(MultimediaContent.class);
        MongoDBService.getDatastore().delete(query);
    }
}
