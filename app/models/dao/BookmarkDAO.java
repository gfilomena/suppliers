package models.dao;

import models.Bookmark;
import models.MultimediaContent;
import models.User;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public interface BookmarkDAO extends DAO<Bookmark, ObjectId> {

    Bookmark get(String id);

    List<Bookmark> findByUser(User user);

    List<Bookmark> findAll();

    boolean isPresent(User user, MultimediaContent mc);

    void deleteAllByUser(User user);

    void deleteByIds(List<String> idsToRemove);
}
