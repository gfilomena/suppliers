package models;


import org.mongodb.morphia.annotations.Entity;

@Entity(value="Role", noClassnameStored = true)
public class Role extends BaseEntity implements be.objectify.deadbolt.java.models.Role{

    private RoleType name;

    public Role(){}

    public Role(RoleType name){
        this.name=name;
    }

    public void setName(RoleType name){
        this.name=name;
    }

    @Override
    public String getName() {
        return name.name();
    }
}
