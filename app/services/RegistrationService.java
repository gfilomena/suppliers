package services;

import com.mongodb.WriteResult;
import models.Registration;
import models.Repository;
import models.User;
import models.dao.RegistrationDAO;
import models.dao.RegistrationDAOImpl;
import org.bson.types.ObjectId;
import services.db.MongoDBService;

import java.util.List;

public class RegistrationService {

    private static RegistrationService instance=null;
    private RegistrationDAO registrationDAO;

    private RegistrationService(){
        registrationDAO=new RegistrationDAOImpl(Registration.class, MongoDBService.getDatastore());
    }

    public static RegistrationService getInstance(){
        if(instance==null){
            instance= new RegistrationService();
        }
        return instance;
    }

    public List<Registration> findRegistrationByUser(User user){
        return registrationDAO.findRegistrationByUser(user);
    }

    public Registration get(String id){
        return registrationDAO.get(id);
    }

    public boolean isPresent(User us, Repository re) {
        return registrationDAO.isPresent(us,re);
    }

    public void save(Registration registration) {
        registrationDAO.save(registration);
    }

    public List<Registration> findAll() {
        return registrationDAO.findAll();
    }

    public List<Repository> findRepositoriesByUser(User user) {
        return registrationDAO.findRepositoriesByUser(user);
    }

    public WriteResult deleteById(ObjectId objectId) {
        return registrationDAO.deleteById(objectId);
    }

    public Registration findByName(String repository) {
        return registrationDAO.findByName(repository);
    }
}
