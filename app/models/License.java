package models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import models.serializer.LicenseSerializer;
import org.mongodb.morphia.annotations.Entity;

/**
 * Created by Pasquale on 26/05/2017.
 */
@Entity(value="License", noClassnameStored = true)
@JsonSerialize(using = LicenseSerializer.class)
public class License extends BaseEntity{

    private String name;

    private String type;

    private String url;

    public License() {
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType( String type ) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl( String url ) {
        this.url = url;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        License license = (License) o;

        if (name != null ? !name.equals(license.name) : license.name != null) return false;
        if (type != null ? !type.equals(license.type) : license.type != null) return false;
        return url != null ? url.equals(license.url) : license.url == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        return result;
    }


}
