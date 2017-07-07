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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 24/04/2017.
 */
public class InternetArchiveSearchRepository implements SearchRepository {

    private final String url=ConfigFactory.load().getString("multimedia.sources.internetArchive.url");
    private WSClient ws;

    private final String internetArchiveURLPrefix="https://archive.org/details/";

    @Inject
    public InternetArchiveSearchRepository(WSClient ws){
        this.ws=ws;
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords ) {
        String query="";
        for(String s : keyWords){
            query+=s;
            query+="+";
        }
        Logger.info("InternetArchive search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(url).
                setQueryParameter("debug", "false").
                setQueryParameter("xvar", "production").
                setQueryParameter("total_only", "false").
                setQueryParameter("count", "100").
                setQueryParameter("fields", "title,description,downloads,identifier,source,type,mediatype,external-identifier,licenseurl,format,bith,collection").
                setQueryParameter("q", query).
                setQueryParameter("sorts", "downloads desc").
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }

    @Override
    public List<MultimediaContent> transform( JsonNode clientResponse ) {
        Logger.info("Internet Archive Response: "+clientResponse.toString());
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
    private MultimediaContent getMultimediaContentFromItem(JsonNode i){
        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m=new MultimediaContent();
        //m.setType(i.get("mediatype").asText());
        m.setType(MultimediaType.video);
        m.setURI(internetArchiveURLPrefix+i.get("identifier").asText());
        // TODO: Modify to find SearchRepository from DB
        m.setSource(new models.Repository());
        m.setName(i.get("title").asText());
        //Logger.debug("Debug internet archive multimedia enum:"+m.toString());
        return m;
        //});

        //return multimediaContent;
    }
}
