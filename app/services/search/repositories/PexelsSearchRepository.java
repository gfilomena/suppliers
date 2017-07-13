package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.typesafe.config.ConfigFactory;
import models.MultimediaContent;
import models.MultimediaType;
import models.Registration;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 04/05/2017.
 */
public class PexelsSearchRepository implements SearchRepository {

    //private final String key= ConfigFactory.load().getString("multimedia.sources.pexels.api.key");
    //private final String url=ConfigFactory.load().getString("multimedia.sources.pexels.url");
    private WSClient ws;
    private Registration registration;

    @Inject
    public PexelsSearchRepository(WSClient ws, Registration registration){

        this.ws=ws;
        this.registration=registration;
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords ) {
        String query="";
        for(String s : keyWords){
            query+=s;
            query+="+";
        }
        Logger.info("Pexels search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(registration.getRepository().getURI()).
                setHeader("Authorization", registration.getApiKey()).
                setQueryParameter("query", query).
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }

    @Override
    public List<MultimediaContent> transform( JsonNode clientResponse ) {
        //Logger.info("Pexels Response: "+clientResponse.toString());
        List<MultimediaContent> stages=new ArrayList<>();
        ArrayNode itemsArray = (ArrayNode) clientResponse.get("photos");
        Iterator<JsonNode> itemsIterator = itemsArray.elements();
        List<JsonNode> itemsList=new ArrayList<JsonNode>();
        while(itemsIterator.hasNext()){
            itemsList.add(itemsIterator.next());
        }
        if(!itemsList.isEmpty()) {
            stages = itemsList
                    .stream()
                    .map(jsonNode -> getMultimediaContentFromItem(jsonNode))
                    .collect(Collectors.toList());
        }
        return stages;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        MultimediaContent m = new MultimediaContent();
        m.setType(MultimediaType.image);
        m.setURI(i.get("src").get("original").asText());
        m.setName(i.get("id").asText());
        m.setThumbnail(i.get("src").get("medium").asText());
        // TODO: Modify to find SearchRepository from DB
        m.setSource(registration.getRepository());
        //Logger.debug("Debug  pexeòs multimedia enum:"+m.toString());
        return m;
    }
}
