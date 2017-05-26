package models;

/**
 * Created by Pasquale on 11/05/2017.
 */
public enum MultimediaType { audio("audio"), video("video"), image("image"), text("text");

    private final String type;

    MultimediaType(String type){
        this.type=type;
    }

    public String type(){
        return type;
    }
}
