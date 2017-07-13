package models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import models.serializer.MultimediaContentSerializer;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Reference;

import java.util.Date;

@Entity(value="MultimediaContent", noClassnameStored = true)
@JsonSerialize(using = MultimediaContentSerializer.class)
public class MultimediaContent extends BaseEntity{

    private MultimediaType type;

    private String fileExtension;

    private String URI;

    private long length;

    private String name;

    private String description;

    private String thumbnail;

    private String downloadURI;

    @Reference
    private Repository source;

    @Reference
    private License license;

    private Date date;

    private JsonNode metadata;

    public MultimediaContent(){

    }

    public MultimediaContent( MultimediaType type, String fileExtension, String URI, long length, String name, String description, String thumbnail, String downloadURI, Repository source, License license, Date date, JsonNode metadata) {
        this.type = type;
        this.fileExtension = fileExtension;
        this.URI = URI;
        this.length = length;
        this.name = name;
        this.description=description;
        this.thumbnail=thumbnail;
        this.downloadURI=downloadURI;
        this.source = source;
        this.license=license;
        this.date=date;
        this.metadata = this.metadata;
    }

    public MultimediaType getType() {
        return type;
    }

    public void setType( MultimediaType type ) {
        this.type = type;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getURI() {
        return URI;
    }

    public void setURI(String URI) {
        this.URI = URI;
    }

    public long getLength() {
        return length;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription( String description ) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail( String thumbnail ) {
        this.thumbnail = thumbnail;
    }

    public String getDownloadURI() {
        return downloadURI;
    }

    public void setDownloadURI( String downloadURI ) {
        this.downloadURI = downloadURI;
    }

    public Repository getSource() {
        return source;
    }

    public void setSource(Repository source) {
        this.source = source;
    }

    public Date getDate() {
        return date;
    }

    public void setDate( Date date ) {
        this.date = date;
    }

    public License getLicense() {
        return license;
    }

    public void setLicense( License license ) {
        this.license = license;
    }

    public JsonNode getMetadata() {
        return metadata;
    }

    public void setMetadata( JsonNode metadata ) {
        this.metadata = metadata;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MultimediaContent that = (MultimediaContent) o;

        if (length != that.length) return false;
        if (type != that.type) return false;
        if (fileExtension != null ? !fileExtension.equals(that.fileExtension) : that.fileExtension != null)
            return false;
        if (URI != null ? !URI.equals(that.URI) : that.URI != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (thumbnail != null ? !thumbnail.equals(that.thumbnail) : that.thumbnail != null) return false;
        if (downloadURI != null ? !downloadURI.equals(that.downloadURI) : that.downloadURI != null) return false;
        if (source != null ? !source.equals(that.source) : that.source != null) return false;
        if (license != null ? !license.equals(that.license) : that.license != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        return metadata != null ? metadata.equals(that.metadata) : that.metadata == null;
    }

    @Override
    public int hashCode() {
        int result = type != null ? type.hashCode() : 0;
        result = 31 * result + (fileExtension != null ? fileExtension.hashCode() : 0);
        result = 31 * result + (URI != null ? URI.hashCode() : 0);
        result = 31 * result + (int) (length ^ (length >>> 32));
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (thumbnail != null ? thumbnail.hashCode() : 0);
        result = 31 * result + (downloadURI != null ? downloadURI.hashCode() : 0);
        result = 31 * result + (source != null ? source.hashCode() : 0);
        result = 31 * result + (license != null ? license.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (metadata != null ? metadata.hashCode() : 0);
        return result;
    }

}