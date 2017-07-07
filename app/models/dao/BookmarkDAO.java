package models.dao;

import models.Bookmark;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

/**
 * Created by Pasquale on 04/07/2017.
 */
public interface BookmarkDAO extends DAO<Bookmark, ObjectId> {
}
