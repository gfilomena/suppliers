package models.dao;

import models.MultimediaContent;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

/**
 * Created by Pasquale on 04/07/2017.
 */
public interface MultimediaContentDAO extends DAO<MultimediaContent, ObjectId> {

    MultimediaContent get(String id);

    List<MultimediaContent> findBySource(String source);

    List<MultimediaContent> findByType(String type);

    void saveAll(List<MultimediaContent> multimediaContents);

    void deleteAll();
}
