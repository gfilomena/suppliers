package models;

import org.mongodb.morphia.annotations.Entity;

/**
 * Created by Pasquale on 19/04/2017.
 */
@Entity(value="Repository", noClassnameStored = true)
public class Repository extends BaseEntity{

    private String name;

    private String URI;

    private String urlPrefix;


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

    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Repository that = (Repository) o;

        if (!name.equals(that.name)) return false;
        return URI.equals(that.URI);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + URI.hashCode();
        return result;
    }
}
