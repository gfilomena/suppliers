package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.typesafe.config.ConfigFactory;
import models.MultimediaContent;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.inject.Inject;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class YoutubeRepository implements Repository {

    private final String key=ConfigFactory.load().getString("multimedia.sources.youtube.api.key");
    private final String url=ConfigFactory.load().getString("multimedia.sources.youtube.url");
    private WSClient ws;

    private final String youtubeURLPrefix="https://www.youtube.com/watch?v=";


    @Inject
    public YoutubeRepository( WSClient ws){
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
        if(!itemsList.isEmpty()) {
            stages = itemsList
                    .stream()
                    .map(jsonNode -> getMultimediaContentFromItem(jsonNode))
                    .collect(Collectors.toList());
        }
        return stages;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m = new MultimediaContent();
        //m.setGenre(i.path("id").get("kind").asText());
        m.setGenre("video");
        m.setURI(youtubeURLPrefix + i.path("id").get("videoId").asText());
        m.setName(i.get("snippet").get("title").asText());
        m.setDescription(i.get("snippet").get("description").asText());
        m.setThumbnail(i.get("snippet").get("thumbnails").get("default").get("url").asText());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        try {
            m.setDate(sdf.parse(i.get("snippet").get("publishedAt").asText()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        m.setSource("youtube");
        return m;
    }
}
