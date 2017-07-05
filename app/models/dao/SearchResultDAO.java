package models.dao;

import models.SearchResult;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 11/05/2017.
 */
public interface SearchResultDAO extends DAO<SearchResult, ObjectId> {

    SearchResult get(String id);

    List<SearchResult> findByUsername(String username);

    List<SearchResult> findByKeywords(String keywords);

}
