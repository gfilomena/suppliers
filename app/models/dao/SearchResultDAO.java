package models.dao;

import models.SearchResult;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 11/05/2017.
 */
public interface SearchResultDAO extends DAO<SearchResult, ObjectId> {

    SearchResult get(String id);

    List<SearchResult> findByUser(User user);

    List<SearchResult> findByKeywords(List<String> keywords);

    void saveAll(List<SearchResult> searchResults);

    void deleteAllByUser(User user);

    void deleteAll();

}
