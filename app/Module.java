import be.objectify.deadbolt.java.cache.HandlerCache;
import security.MyHandlerCache;
import services.search.repositories.SearchRepository;
import services.search.repositories.YoutubeSearchRepository;
import com.google.inject.AbstractModule;
import com.google.inject.name.Names;
import services.search.Manager;
import services.search.SearchManager;
import services.ApplicationTimer;
import services.AtomicCounter;
import services.Counter;

import java.time.Clock;

/**
 * This class is a Guice module that tells Guice how to bind several
 * different types. This Guice module is created when the Play
 * application starts.
 *
 * Play will automatically use any class called `Module` that is in
 * the root package. You can create modules in other locations by
 * adding `play.modules.enabled` settings to the `application.conf`
 * configuration file.
 */
public class Module extends AbstractModule {

    @Override
    public void configure() {
        // Use the system clock as the default implementation of Clock
        bind(Clock.class).toInstance(Clock.systemDefaultZone());
        // Ask Guice to create an instance of ApplicationTimer when the
        // application starts.
        bind(ApplicationTimer.class).asEagerSingleton();
        // Set AtomicCounter as the implementation for Counter.
        bind(Counter.class).to(AtomicCounter.class);
        bind(SearchRepository.class).annotatedWith(Names.named("youtube")).to(YoutubeSearchRepository.class);
        bind(Manager.class).to(SearchManager.class);
        bind(HandlerCache.class).to(MyHandlerCache.class);
    }

}
