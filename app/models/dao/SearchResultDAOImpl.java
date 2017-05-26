package models.dao;

import com.mongodb.MongoClient;
import models.SearchResult;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

/**
 * Created by Pasquale on 11/05/2017.
 */
public class SearchResultDAOImpl extends BasicDAO<SearchResult,ObjectId> implements SearchResultDAO{


    public SearchResultDAOImpl( Class<SearchResult> entityClass, MongoClient mongoClient, Morphia morphia, String dbName ) {
        super(entityClass, mongoClient, morphia, dbName);
    }


}
