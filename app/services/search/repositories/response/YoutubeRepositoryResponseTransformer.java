package services.search.repositories.response;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import play.Logger;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Pasquale on 16/03/2017.
 */
public class YoutubeRepositoryResponseTransformer implements RepositoryResponseTransformer {

    private final String youtubeURLPrefix="https://www.youtube.com/watch?v=";

    @Override
    public List<MultimediaContent> tranform( JsonNode clientResponse ) {
        Logger.info("Youtube Response: "+clientResponse.toString());
        JsonNode items=clientResponse.path("items");
        final List<MultimediaContent> multimediaContents = new ArrayList<MultimediaContent>();
        if(items.isArray()) {
            items.forEach(( JsonNode i ) -> multimediaContents.add(getMultimediaContentFromItem(i)));
        }

        return multimediaContents;
    }

    private MultimediaContent getMultimediaContentFromItem(JsonNode i){
        MultimediaContent m=new MultimediaContent();
        m.setGenre(i.path("id").get("kind").asText());
        m.setURI(youtubeURLPrefix+i.path("id").get("videoId").asText());
        return m;
    }


}
