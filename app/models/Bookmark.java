package models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import models.serializer.BookmarkSerializer;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Reference;

import java.util.Date;

/**
 * Created by Pasquale on 11/05/2017.
 */
@Entity(value="Bookmark", noClassnameStored = true)
@JsonSerialize(using = BookmarkSerializer.class)
public class Bookmark extends BaseEntity {

    @Reference
    private User user;

    @Reference
    private MultimediaContent multimediaContent;

    private Date date;

    public Bookmark(){}

    public User getUser() {
        return user;
    }

    public void setUser( User user ) {
        this.user = user;
    }

    public MultimediaContent getMultimediaContent() {
        return multimediaContent;
    }

    public void setMultimediaContent( MultimediaContent multimediaContent ) {
        this.multimediaContent = multimediaContent;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Bookmark bookmark = (Bookmark) o;

        if (user != null ? !user.equals(bookmark.user) : bookmark.user != null) return false;
        return multimediaContent != null ? multimediaContent.equals(bookmark.multimediaContent) : bookmark.multimediaContent == null;
    }

    @Override
    public int hashCode() {
        int result = user != null ? user.hashCode() : 0;
        result = 31 * result + (multimediaContent != null ? multimediaContent.hashCode() : 0);
        return result;
    }


}
