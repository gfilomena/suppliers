package services;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.typesafe.config.ConfigFactory;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import play.Logger;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class MongoDBService {

    private static Datastore datastore;

    public static Datastore getDatastore() {
        if (datastore == null) {
            initDatastore();
        }
        return datastore;
    }

    public static void initDatastore() {

        final Morphia morphia = new Morphia();

        // Tell Morphia where to find our models
        morphia.mapPackage("models");
        MongoClientURI uri = new MongoClientURI(ConfigFactory.load().getString("mongodb.uri"));
        /*MongoClient mongoClient = new MongoClient(
                ConfigFactory.load().getString("mongodb.host"),
                ConfigFactory.load().getInt("mongodb.port"));*/
        MongoClient mongoClient = new MongoClient(uri);
        datastore = morphia.createDatastore(
                mongoClient, ConfigFactory.load().getString("mongodb.name"));
        datastore.ensureIndexes();
        Logger.info("Connected to MongoDB at "+uri.getURI() + " DB name: "+datastore.getDB().getName());
    }

}
