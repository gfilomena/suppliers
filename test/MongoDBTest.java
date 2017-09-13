import com.google.inject.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.Application;
import play.ApplicationLoader;
import play.Environment;
import play.Mode;
import play.inject.guice.GuiceApplicationBuilder;
import play.inject.guice.GuiceApplicationLoader;
import play.test.Helpers;

import javax.inject.Inject;
import java.io.File;

/**
 * Created by Pasquale on 05/07/2017.
 */
public class MongoDBTest {

    @Inject
    Application application;

    /*@Before
    public void setup() {
        com.google.inject.Module testModule = new AbstractModule() {
            @Override
            public void configure() {
                // Install custom test binding here
            }
        };

        GuiceApplicationBuilder builder = new GuiceApplicationLoader()
                .builder(new ApplicationLoader.Context(Environment.simple()))
                .overrides(testModule);
        GuiceApplicationBuilder.createInjector(builder.applicationModule()).injectMembers(this);

        Helpers.start(application);
    }

    @After
    public void teardown() {
        Helpers.stop(application);
    }

    @Test
    public void findById() {
        ClassLoader classLoader = classLoader();
        Application application = new GuiceApplicationBuilder()
                .in(new Environment(new File("path/to/app"), classLoader, Mode.TEST))
                .build();

        running(application, () -> {

        });
    }*/
}
