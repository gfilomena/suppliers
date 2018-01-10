package services;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.CompletableFuture;
import javax.inject.*;

import common.ConfigObj;
import models.*;
import models.dao.*;
import play.Logger;
import play.inject.ApplicationLifecycle;
import services.db.MongoDBService;

/**
 * This class demonstrates how to run code when the
 * application starts and stops. It starts a timer when the
 * application starts. When the application stops it prints out how
 * long the application was running for.
 *
 * This class is registered for Guice dependency injection in the
 * {@link Module} class. We want the class to start when the application
 * starts, so it is registered as an "eager singleton". See the code
 * in the {@link Module} class to see how this happens.
 *
 * This class needs to run code when the server stops. It uses the
 * application's {@link ApplicationLifecycle} to register a stop hook.
 */
@Singleton
public class ApplicationTimer {

    private final Clock clock;
    private final ApplicationLifecycle appLifecycle;
    private final Instant start;

    @Inject
    public ApplicationTimer(Clock clock, ApplicationLifecycle appLifecycle) {
        this.clock = clock;
        this.appLifecycle = appLifecycle;
        // This code is called when the application starts.
        start = clock.instant();
        Logger.info("ApplicationTimer demo: Starting application at " + start);
        SearchResultDAO searchResultDAO=new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());
        searchResultDAO.deleteAll();
        Logger.info("OCD: Purged Search Results");
        MultimediaContentDAO multimediaContentDAO=new MultimediaContentDAOImpl(MultimediaContent.class,MongoDBService.getDatastore());
        //multimediaContentDAO.deleteAll();
        Logger.info("OCD: Purged Multimedia Content Results");
        // Initialize Roles
        Logger.info("OCD Initialization of Roles");
        initializeRoles();
        Logger.info("OCD Initialization of Repositories");
        initializeRepositories();
        Logger.info("OCD Initialize Administrator");
        initializeAdministrator();
        // When the application starts, register a stop hook with the
        // ApplicationLifecycle object. The code inside the stop hook will
        // be run when the application stops.
        appLifecycle.addStopHook(() -> {
            Instant stop = clock.instant();
            Long runningTime = stop.getEpochSecond() - start.getEpochSecond();
            Logger.info("ApplicationTimer demo: Stopping application at " + clock.instant() + " after " + runningTime + "s.");
            return CompletableFuture.completedFuture(null);
        });
    }

    private void initializeAdministrator() {
        UserDAO userDAO=new UserDAOImpl(User.class,MongoDBService.getDatastore());
        RoleDAO roleDAO=new RoleDAOImpl(Role.class,MongoDBService.getDatastore());
        if(userDAO.findByUsername("Administrator")==null){
            User admin=new User("Administrator","Administrator","Administrator","Administrator","pasquale.panuccio@finconsgroup.com");
            admin.setUserId("Administrator");
            admin.addRole(roleDAO.findByName(RoleType.ADMIN));
            userDAO.save(admin);
            Logger.debug("Saved Administrator User");
        }
    }

    private void initializeRepositories() {
        RepositoryDAO repoDAO=new RepositoryDAOImpl(Repository.class,MongoDBService.getDatastore());
        if(repoDAO.findAll().size()!=6){ // actually there are 6 repositories configures
            repoDAO.deleteAll();
            Repository youtube=new Repository();
            youtube.setName("Youtube");
            youtube.setURI(ConfigObj.configuration.getString("multimedia.sources.youtube.url"));
            youtube.setUrlPrefix(ConfigObj.configuration.getString("multimedia.sources.youtube.urlPrefix"));
            repoDAO.save(youtube);
            Logger.debug("Saved Youtube");
            Repository internetArchive=new Repository();
            internetArchive.setName("InternetArchive");
            internetArchive.setURI(ConfigObj.configuration.getString("multimedia.sources.internetArchive.url"));
            internetArchive.setUrlPrefix(ConfigObj.configuration.getString("multimedia.sources.internetArchive.urlPrefix"));
            repoDAO.save(internetArchive);
            Logger.debug("Saved InternetArchive");
            Repository pexels=new Repository();
            pexels.setName("Pexels");
            pexels.setURI(ConfigObj.configuration.getString("multimedia.sources.pexels.url"));
            repoDAO.save(pexels);
            Logger.debug("Saved Pexels");
            Repository pixabay=new Repository();
            pixabay.setName("Pixabay");
            pixabay.setURI(ConfigObj.configuration.getString("multimedia.sources.pixabay.url"));
            repoDAO.save(pixabay);
            Logger.debug("Saved Pixabay");
            Repository wikipedia=new Repository();
            wikipedia.setName("Wikipedia");
            wikipedia.setURI(ConfigObj.configuration.getString("multimedia.sources.wikipedia.url"));
            repoDAO.save(wikipedia);
            Logger.debug("Saved Wikipedia");
            Repository vimeo=new Repository();
            vimeo.setName("Vimeo");
            vimeo.setURI(ConfigObj.configuration.getString("multimedia.sources.vimeo.url"));
            vimeo.setUrlPrefix(ConfigObj.configuration.getString("multimedia.sources.vimeo.urlPrefix"));
            repoDAO.save(vimeo);
            Logger.debug("Saved Vimeo");
        }
    }

    private void initializeRoles() {
        RoleDAO roleDAO=new RoleDAOImpl(Role.class,MongoDBService.getDatastore());
        if(roleDAO.findByName(RoleType.USER)==null && roleDAO.findByName(RoleType.ADMIN)==null && roleDAO.findAll().size()<2){
            roleDAO.deleteAll();
            Role userRole=new Role(RoleType.USER);
            Role adminRole=new Role(RoleType.ADMIN);
            roleDAO.save(userRole);
            roleDAO.save(adminRole);
            Logger.info("OCd : Roles created");
        }
    }

}
