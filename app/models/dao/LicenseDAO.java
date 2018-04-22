package models.dao;

import models.License;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;


public interface LicenseDAO extends DAO<License, ObjectId> {

    License get(String id);

    License findByName(String name);

    List<License> findAll();

    void deleteAll();

    List<License> findInternetArchivesLicenses();

    License findByType(String type);
}
