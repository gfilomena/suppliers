package services;

import java.time.Clock;
import java.time.Instant;
import java.util.concurrent.CompletableFuture;
import javax.inject.*;

import models.MultimediaContent;
import models.Role;
import models.RoleType;
import models.SearchResult;
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
        RoleDAO roleDAO=new RoleDAOImpl(Role.class,MongoDBService.getDatastore());
        if(roleDAO.findByName(RoleType.USER)==null && roleDAO.findByName(RoleType.ADMIN)==null && roleDAO.findAll().size()<2){
            roleDAO.deleteAll();
            Role userRole=new Role(RoleType.USER);
            Role adminRole=new Role(RoleType.ADMIN);
            roleDAO.save(userRole);
            roleDAO.save(adminRole);
        }
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

}
