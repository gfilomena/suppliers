package models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import models.serializer.SearchResultSerializer;
import org.mongodb.morphia.annotations.*;
import org.mongodb.morphia.utils.IndexType;

import java.util.*;

/**
 * Created by Pasquale on 15/03/2017.
 */
@Entity(value="SearchResult", noClassnameStored = true)
@Indexes(@Index(fields = @Field(value = "$**", type = IndexType.TEXT)))
@JsonSerialize(using = SearchResultSerializer.class)
public class SearchResult extends BaseEntity{

    private List<String> keyWords=new ArrayList<String>();

    //@Reference
    private List<MultimediaContent> multimediaContents=new ArrayList<MultimediaContent>();

    @Reference
    private User user=new User();

    private Date date=new Date();

    private Date inDate =new Date();

    private Date endDate=new Date();

    private long nOfResults;

    public SearchResult(){

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

    public Date getInDate() {
        return inDate;
    }

    public void setInDate(Date inDate) {
        this.inDate = inDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate( Date endDate ) {
        this.endDate = endDate;
    }

    public long getnOfResults() {
        return nOfResults;
    }

    public void setnOfResults(long nOfResults) {
        this.nOfResults = nOfResults;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SearchResult that = (SearchResult) o;

        if (keyWords != null ? !keyWords.equals(that.keyWords) : that.keyWords != null) return false;
        if (multimediaContents != null ? !multimediaContents.equals(that.multimediaContents) : that.multimediaContents != null)
            return false;
        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (inDate != null ? !inDate.equals(that.inDate) : that.inDate != null) return false;
        return endDate != null ? endDate.equals(that.endDate) : that.endDate == null;
    }

    @Override
    public int hashCode() {
        int result = keyWords != null ? keyWords.hashCode() : 0;
        result = 31 * result + (multimediaContents != null ? multimediaContents.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (inDate != null ? inDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        return result;
    }


}
