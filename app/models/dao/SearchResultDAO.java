package models.dao;

import models.SearchResult;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

/**
 * Created by Pasquale on 11/05/2017.
 */
public interface SearchResultDAO extends DAO<SearchResult, ObjectId> {




}
