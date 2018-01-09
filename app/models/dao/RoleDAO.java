package models.dao;

import models.Role;
import models.RoleType;
import org.bson.types.ObjectId;
import org.mongodb.morphia.dao.DAO;

import java.util.List;

public interface RoleDAO extends DAO<Role, ObjectId> {

    Role get(String id);

    Role findByName(RoleType roleType);

    List<Role> findAll();

    void deleteAll();

}
