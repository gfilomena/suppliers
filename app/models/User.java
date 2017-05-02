package models;

import com.fasterxml.jackson.databind.JsonNode;
import org.bson.types.ObjectId;
import org.mindrot.jbcrypt.BCrypt;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Version;
import play.libs.Json;

/**
 * Created by Pasquale on 03/04/2017.
 */
@Entity(value="User", noClassnameStored = true)
public class User {

    @Id
    private ObjectId id;

    private String username;

    private String hashPassword;

    private String firstName;

    private String lastName;

    private String email;

    private String token;

    @Version
    private Long version;

    public User(){

    }

    public User(String username, String password, String firstName, String lastName, String email) {
        this.username = username;
        this.hashPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        if (username != null ? !username.equals(user.username) : user.username != null) return false;
        if (hashPassword != null ? !hashPassword.equals(user.hashPassword) : user.hashPassword != null) return false;
        if (firstName != null ? !firstName.equals(user.firstName) : user.firstName != null) return false;
        if (lastName != null ? !lastName.equals(user.lastName) : user.lastName != null) return false;
        return version != null ? version.equals(user.version) : user.version == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (hashPassword != null ? hashPassword.hashCode() : 0);
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
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
