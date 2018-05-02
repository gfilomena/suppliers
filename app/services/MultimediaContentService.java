package services;

import akka.io.Tcp;
import com.mongodb.WriteResult;
import models.MultimediaContent;
import models.dao.MultimediaContentDAO;
import models.dao.MultimediaContentDAOImpl;
import services.db.MongoDBService;

public class MultimediaContentService {

    private MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class, MongoDBService.getDatastore());

    public void save(MultimediaContent mc){
        multimediaContentDAO.save(mc);
    }

    public WriteResult delete(MultimediaContent multimediaContent) {
        return multimediaContentDAO.delete(multimediaContent);
    }
}
