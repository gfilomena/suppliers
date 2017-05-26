package models;

import org.mongodb.morphia.annotations.Entity;

import java.util.Date;

@Entity(value="MultimediaContent", noClassnameStored = true)
public class MultimediaContent extends BaseEntity{

    private MultimediaType type;

    private String fileExtension;

    private String URI;

    private String length;

    private String name;

    private String description;

    private String thumbnail;

    private String downloadURI;

    private String source;

    private String licenseType;

    private Date date;

    public MultimediaContent(){

    }

    public MultimediaContent( MultimediaType type, String fileExtension, String URI, String length, String name, String description, String thumbnail, String downloadURI, String source, String licenseType, Date date) {
        this.type = type;
        this.fileExtension = fileExtension;
        this.URI = URI;
        this.length = length;
        this.name = name;
        this.description=description;
        this.thumbnail=thumbnail;
        this.downloadURI=downloadURI;
        this.source = source;
        this.licenseType=licenseType;
        this.date=date;
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

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getLicenseType() {
        return licenseType;
    }

    public void setLicenseType( String licenseType ) {
        this.licenseType = licenseType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate( Date date ) {
        this.date = date;
    }

    @Override
    public boolean equals( Object o ) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MultimediaContent that = (MultimediaContent) o;

        if (type != that.type) return false;
        if (fileExtension != null ? !fileExtension.equals(that.fileExtension) : that.fileExtension != null)
            return false;
        if (URI != null ? !URI.equals(that.URI) : that.URI != null) return false;
        if (length != null ? !length.equals(that.length) : that.length != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (thumbnail != null ? !thumbnail.equals(that.thumbnail) : that.thumbnail != null) return false;
        if (downloadURI != null ? !downloadURI.equals(that.downloadURI) : that.downloadURI != null) return false;
        if (source != null ? !source.equals(that.source) : that.source != null) return false;
        if (licenseType != null ? !licenseType.equals(that.licenseType) : that.licenseType != null) return false;
        return date != null ? date.equals(that.date) : that.date == null;
    }

    @Override
    public int hashCode() {
        int result = type != null ? type.hashCode() : 0;
        result = 31 * result + (fileExtension != null ? fileExtension.hashCode() : 0);
        result = 31 * result + (URI != null ? URI.hashCode() : 0);
        result = 31 * result + (length != null ? length.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (thumbnail != null ? thumbnail.hashCode() : 0);
        result = 31 * result + (downloadURI != null ? downloadURI.hashCode() : 0);
        result = 31 * result + (source != null ? source.hashCode() : 0);
        result = 31 * result + (licenseType != null ? licenseType.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }
}