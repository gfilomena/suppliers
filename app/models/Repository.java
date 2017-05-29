package models;

import org.mongodb.morphia.annotations.Entity;

/**
 * Created by Pasquale on 19/04/2017.
 */
@Entity(value="Repository", noClassnameStored = true)
public class Repository extends BaseEntity{

    private String name;

    private String URI;

    private String apiKey;

    public Repository(){}

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

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Repository that = (Repository) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (URI != null ? !URI.equals(that.URI) : that.URI != null) return false;
        return apiKey != null ? apiKey.equals(that.apiKey) : that.apiKey == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (URI != null ? URI.hashCode() : 0);
        result = 31 * result + (apiKey != null ? apiKey.hashCode() : 0);
        return result;
    }


}
