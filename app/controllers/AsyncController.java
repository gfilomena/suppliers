package controllers;

import akka.actor.ActorSystem;
import com.fasterxml.jackson.databind.JsonNode;
import com.typesafe.config.ConfigFactory;
import models.*;
import models.dao.UserDAOImpl;
import org.mongodb.morphia.Key;
import org.mongodb.morphia.query.Query;
import play.libs.Json;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Results;
import scala.concurrent.ExecutionContextExecutor;
import scala.concurrent.duration.Duration;
import services.db.MongoDBService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Clock;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;

/**
 * This controller contains an action that demonstrates how to write
 * simple asynchronous code in a controller. It uses a timer to
 * asynchronously delay sending a response for 1 second.
 *
 * @param actorSystem We need the {@link ActorSystem}'s
 *                    {@link Scheduler} to run code after a delay.
 * @param exec        We need a Java {@link Executor} to apply the result
 *                    of the {@link CompletableFuture} and a Scala
 *                    {@link ExecutionContext} so we can use the Akka {@link Scheduler}.
 *                    An {@link ExecutionContextExecutor} implements both interfaces.
 */
@Singleton
public class AsyncController extends Controller {

    private final ActorSystem actorSystem;
    private final ExecutionContextExecutor exec;
    private final WSClient ws;


    @Inject
    public AsyncController(ActorSystem actorSystem, ExecutionContextExecutor exec, WSClient ws) {
        this.actorSystem = actorSystem;
        this.exec = exec;
        this.ws = ws;
    }

    /**
     * An action that returns a plain text message after a delay
     * of 1 second.
     * <p>
     * The configuration in the <code>routes</code> file means that this method
     * will be called when the application receives a <code>GET</code> request with
     * a path of <code>/message</code>.
     */
    public CompletionStage<Result> message() {
        return getFutureMessage(1, TimeUnit.SECONDS).thenApplyAsync(Results::ok, exec);
    }

    private CompletionStage<String> getFutureMessage(long time, TimeUnit timeUnit) {
        CompletableFuture<String> future = new CompletableFuture<>();
        actorSystem.scheduler().scheduleOnce(
                Duration.create(time, timeUnit),
                () -> future.complete("Hi Pasquale!"),
                exec
        );
        return future;
    }

    public CompletionStage<Result> test() {
        SearchResult qr=new SearchResult();
        Repository r=new Repository();
        MongoDBService.getDatastore().save(r);
        License l=new License();
        MongoDBService.getDatastore().save(l);
        MultimediaContent mc=new MultimediaContent(MultimediaType.video,"mp4", "youtube/dsadaòjs432",2048,"videotest1","description", "thumbnail","downloadURI",r, l, new Date(), Json.toJson("{ metadata: test }"));
        MongoDBService.getDatastore().save(mc);
        qr.getMultimediaContents().add(mc);
        qr.getMultimediaContents().add(mc);
        qr.setDate(Date.from(Clock.systemDefaultZone().instant()));
        qr.setUser(new UserDAOImpl(User.class,MongoDBService.getDatastore()).findByUsername("ppanuccio"));
        Key<SearchResult> key= MongoDBService.getDatastore().save(qr);
        System.out.println("Key returned: "+key.toString());
        System.out.println(key.getId().getClass());
        System.out.println(qr.toString());

        //return testApi().thenApply(Results::ok);
        return CompletableFuture.supplyAsync(() -> ok());
    }

    public Result query(){
        final Query<SearchResult> query= MongoDBService.getDatastore().createQuery(SearchResult.class);
        final List<SearchResult> qrList=query.asList();
        JsonNode json = Json.toJson(qrList);
        return ok(json);

    }

    private CompletionStage<JsonNode> testApi() {
        System.out.println("Inside testApi: "+ConfigFactory.load().getString("multimedia.sources.youtube.api.key"));
        String url = ConfigFactory.load().getString("multimedia.sources.youtube.api.key");
        CompletionStage<JsonNode> jsonPromise = ws.url(url).
                setQueryParameter("part", "snippet").
                setQueryParameter("key", ConfigFactory.load().getString("multimedia.sources.youtube.api.key")).
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }
}
