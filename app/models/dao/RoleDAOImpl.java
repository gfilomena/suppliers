package models.dao;

import models.Role;
import models.RoleType;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import services.db.MongoDBService;

import java.util.List;

public class RoleDAOImpl extends BasicDAO<Role, ObjectId> implements RoleDAO {

    public RoleDAOImpl( Class<Role> entityClass, Datastore ds ) {
        super(entityClass, ds);
    }

    @Override
    public Role get(String id) {
        return this.get(new ObjectId(id));
    }

    @Override
    public Role findByName(RoleType roleType) {
        return this.findOne("name", roleType.name());
    }

    @Override
    public List<Role> findAll() {
        return this.find().asList();
    }

    @Override
    public void deleteAll() {
        Query<Role> query= MongoDBService.getDatastore().createQuery(Role.class);
        MongoDBService.getDatastore().delete(query);
    }
}
