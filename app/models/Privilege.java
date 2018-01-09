package models;

import be.objectify.deadbolt.java.models.Permission;
import org.mongodb.morphia.annotations.Entity;

@Entity(value="Privilege", noClassnameStored = true)
public class Privilege extends BaseEntity implements Permission {

    private String name;

    public Privilege(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getValue() {
        return null;
    }
}
