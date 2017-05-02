package models;

import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;
import play.libs.Json;

/**
 * Created by Pasquale on 19/04/2017.
 */
@Entity(value="Registration", noClassnameStored = true)
public class Registration {

    @Id
    private ObjectId id;

    @Reference
    private User user;

    @Reference
    private Repository repository;

    private String apiKey;

    public Registration() {}

    public ObjectId getId() {
        return id;
    }

    public void setId( ObjectId id ) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser( User user ) {
        this.user = user;
    }

    public Repository getRepository() {
        return repository;
    }

    public void setRepository( Repository repository ) {
        this.repository = repository;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey( String apiKey ) {
        this.apiKey = apiKey;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Registration that = (Registration) o;

        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        return repository != null ? repository.equals(that.repository) : that.repository == null;
    }

    @Override
    public int hashCode() {
        int result = user != null ? user.hashCode() : 0;
        result = 31 * result + (repository != null ? repository.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        JsonNode json= Json.toJson(this);
        return json.toString();
    }

    public JsonNode asJson(){
        return Json.toJson(this);
    }
}
