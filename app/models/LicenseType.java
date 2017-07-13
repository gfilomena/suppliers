package models;

/**
 * Created by Pasquale on 11/05/2017.
 */
public enum LicenseType{ CC("CC"), MIT("MIT");

    private final String type;

    LicenseType(String type){
        this.type=type;
    }

    public String type(){
        return type;
    }
}
