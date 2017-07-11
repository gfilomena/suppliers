package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.typesafe.config.ConfigFactory;
import models.MultimediaContent;
import models.MultimediaType;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class YoutubeSearchRepository implements SearchRepository {

    private final String key=ConfigFactory.load().getString("multimedia.sources.youtube.api.key");
    private final String url=ConfigFactory.load().getString("multimedia.sources.youtube.url");
    private WSClient ws;

    private final String youtubeURLPrefix="https://www.youtube.com/embed/";


    @Inject
    public YoutubeSearchRepository(WSClient ws){
        this.ws=ws;
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords){
        String query="";
        for(String s : keyWords){
            query+=s;
            query+="+";
        }
        Logger.info("Youtube search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(url).
                setQueryParameter("part", "snippet").
                setQueryParameter("q", query).
                setQueryParameter("key", key).
                setQueryParameter("type", "video").
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }


    @Override
    public List<MultimediaContent> transform( JsonNode clientResponse ) {
        //Logger.info("Youtube Response: "+clientResponse.toString());
        List<MultimediaContent> stages=new ArrayList<>();
        //List<JsonNode> items=clientResponse.findValues("items");
        ArrayNode itemsArray = (ArrayNode) clientResponse.get("items");
        Iterator<JsonNode> itemsIterator = itemsArray.elements();
        List<JsonNode> itemsList=new ArrayList<JsonNode>();
        while(itemsIterator.hasNext()){
            itemsList.add(itemsIterator.next());
        }
        /*final List<MultimediaContent> multimediaContents = new ArrayList<MultimediaContent>();
        if(items.isArray()) {
            items.forEach(( JsonNode i ) -> multimediaContents.add(getMultimediaContentFromItem(i)));
        }

        return multimediaContents;*/
        Function<JsonNode, MultimediaContent> convertToMultimediaContent=
                jsonNode -> getMultimediaContentFromItem(jsonNode);
        if(!itemsList.isEmpty()) {
            stages = itemsList
                    .stream()
                    .map(convertToMultimediaContent)
                    .collect(Collectors.toList());
        }
        return stages;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m = new MultimediaContent();
        //m.setType(i.path("id").get("kind").asText());
        m.setType(MultimediaType.video);
        m.setURI(youtubeURLPrefix + i.path("id").get("videoId").asText());
        m.setName(i.get("snippet").get("title").asText());
        m.setDescription(i.get("snippet").get("description").asText());
        m.setThumbnail(i.get("snippet").get("thumbnails").get("default").get("url").asText());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        try {
            m.setDate(sdf.parse(i.get("snippet").get("publishedAt").asText()));
            //Logger.debug("*********DATE:"+sdf.parse(i.get("snippet").get("publishedAt").asText()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        // TODO: Modify to find SearchRepository from DB
        m.setSource(new models.Repository());
        //Logger.debug("Debug multimedia enum:"+m.toString());
        return m;
    }
}