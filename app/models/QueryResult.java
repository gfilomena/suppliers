package models;

import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.annotations.Version;
import play.libs.Json;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Pasquale on 15/03/2017.
 */
@Entity(value="QueryResult", noClassnameStored = true)
public class QueryResult {

    @Id
    private ObjectId id;

    private List<String> keyWords=new ArrayList<String>();

    private List<MultimediaContent> multimediaContents=new ArrayList<MultimediaContent>();

    @Reference
    private User user=new User();

    private Date date=new Date();

    @Version
    private Long version;

    public QueryResult(){

    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public List<String> getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(List<String> keyWords) {
        this.keyWords = keyWords;
    }

    public List<MultimediaContent> getMultimediaContents() {
        return multimediaContents;
    }

    public void setMultimediaContents(List<MultimediaContent> multimediaContents) {
        this.multimediaContents = multimediaContents;
    }

    public User getUser() {
        return user;
    }

    public void setUser( User user ) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate( Date date ) {
        this.date = date;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        QueryResult that = (QueryResult) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (multimediaContents != null ? !multimediaContents.equals(that.multimediaContents) : that.multimediaContents != null)
            return false;
        return version != null ? version.equals(that.version) : that.version == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (multimediaContents != null ? multimediaContents.hashCode() : 0);
        result = 31 * result + (version != null ? version.hashCode() : 0);
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
