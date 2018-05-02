package models.dao;

import models.SearchResult;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import play.Logger;
import services.db.MongoDBService;

import java.util.List;

/**
 * Created by Pasquale on 11/05/2017.
 */
public class SearchResultDAOImpl extends BasicDAO<SearchResult, ObjectId> implements SearchResultDAO {


    public SearchResultDAOImpl(Class<SearchResult> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

    @Override
    public SearchResult get(String id) {
        Logger.info("Search result Id:" + id);
        return this.get(new ObjectId(id));
    }

    @Override
    public List<SearchResult> findByUser(User user) {
        return MongoDBService.getDatastore().createQuery(SearchResult.class).filter("user = ", user).asList();
    }

    @Override
    public List<SearchResult> findByKeywords(List<String> keywords) {
        return MongoDBService.getDatastore().createQuery(SearchResult.class)
                .field("keyWords")
                .hasAllOf(keywords)
                .asList();
    }

    @Override
    public void saveAll(List<SearchResult> searchResults) {
        searchResults.stream().forEach(l -> MongoDBService.getDatastore().save(l));
    }

    @Override
    public void deleteAllByUser(User user) {
        Query<SearchResult> query = MongoDBService.getDatastore().createQuery(SearchResult.class).filter("user = ", user);
        MongoDBService.getDatastore().delete(query);
    }

    @Override
    public void deleteAll() {
        Query<SearchResult> query = MongoDBService.getDatastore().createQuery(SearchResult.class);
        MongoDBService.getDatastore().delete(query);
    }
}
