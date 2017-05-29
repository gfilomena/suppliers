package models;

/**
 * Created by Pasquale on 26/05/2017.
 */
public class License {

    private String name;

    private LicenseType type;

    private String version;

    private String url;

    public License() {
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public LicenseType getType() {
        return type;
    }

    public void setType( LicenseType type ) {
        this.type = type;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion( String version ) {
        this.version = version;
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
        if (version != null ? !version.equals(license.version) : license.version != null) return false;
        return url != null ? url.equals(license.url) : license.url == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (version != null ? version.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        return result;
    }


}
