package services;

import models.Registration;
import models.User;
import models.dao.RegistrationDAO;
import models.dao.RegistrationDAOImpl;
import services.db.MongoDBService;

import java.util.List;

public class RegistrationService {

    private RegistrationDAO registrationDAO = new RegistrationDAOImpl(Registration.class, MongoDBService.getDatastore());

    public List<Registration> findRegistrationByUser(User user){
        return registrationDAO.findRegistrationByUser(user);
    }
}
