package models.dao;

import models.License;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import services.db.MongoDBService;

import java.util.List;

public class LicenseDAOImpl extends BasicDAO<License,ObjectId> implements LicenseDAO {

    public LicenseDAOImpl( Class<License> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public License get(String id) {
        return this.get(new ObjectId(id));
    }

    @Override
    public License findByName(String name) {
        return this.findOne("name",name);
    }

    @Override
    public List<License> findAll() {
        return this.find().asList();
    }

    @Override
    public void deleteAll() {
        Query<License> query=MongoDBService.getDatastore().createQuery(License.class);
        MongoDBService.getDatastore().delete(query);
    }

    @Override
    public List<License> findInternetArchivesLicenses(){
        return this.find(MongoDBService.getDatastore().createQuery(License.class).filter("name", "InternetArchive")).asList();
    }

    @Override
    public License findByType(String type) {
        return this.findOne("type",type);
    }
}
