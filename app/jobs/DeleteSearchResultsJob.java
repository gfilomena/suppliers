package jobs;

import akka.actor.ActorSystem;
import com.github.tuxBurner.jobs.AbstractConfigurationJob;
import com.github.tuxBurner.jobs.AkkaJob;
import com.github.tuxBurner.jobs.JobException;
import models.MultimediaContent;
import models.SearchResult;
import models.dao.MultimediaContentDAO;
import models.dao.MultimediaContentDAOImpl;
import models.dao.SearchResultDAO;
import models.dao.SearchResultDAOImpl;
import services.db.MongoDBService;

/**
 * Simple job which is fired every 15 Seconds
 */
@AkkaJob(cronExpression = "0/15 * * * * ?")
public class DeleteSearchResultsJob extends AbstractConfigurationJob {

    public DeleteSearchResultsJob(ActorSystem actorSystem) throws JobException {
        super(actorSystem);
    }

    @Override
    public void runInternal() {
        /*final String param = getConfiguration().getString("param");
        SearchResultDAO searchResultDAO=new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());
        searchResultDAO.deleteAll();
        MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class,MongoDBService.getDatastore());
        multimediaContentDAO.deleteAll();*/
    }
}
