package models;

import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import play.libs.Json;

/**
 * Created by Pasquale on 19/04/2017.
 */
@Entity(value="Repository", noClassnameStored = true)
public class Repository {

    @Id
    private ObjectId id;

    private String name;

    private String URI;

    private String apiKey;

    public Repository(){}

    public ObjectId getId() {
        return id;
    }

    public void setId( ObjectId id ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getURI() {
        return URI;
    }

    public void setURI( String URI ) {
        this.URI = URI;
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

        Repository that = (Repository) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (URI != null ? !URI.equals(that.URI) : that.URI != null) return false;
        return apiKey != null ? apiKey.equals(that.apiKey) : that.apiKey == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (URI != null ? URI.hashCode() : 0);
        result = 31 * result + (apiKey != null ? apiKey.hashCode() : 0);
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
