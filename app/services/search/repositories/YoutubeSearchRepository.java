package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import models.License;
import models.MultimediaContent;
import models.MultimediaType;
import models.Registration;
import models.response.RepositoryResponseMapping;
import models.response.ResponseMapping;
import models.response.YoutubeRepositoryResponseMapping;
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

    private WSClient ws;
    private Registration reg;

    @Inject
    public YoutubeSearchRepository(WSClient ws, Registration registration){
        this.ws=ws;
        this.reg=registration;
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords){
        String query=String.join(" ", keyWords);
        Logger.info("Youtube search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(reg.getRepository().getURI()).
                setQueryParameter("part", "snippet").
                setQueryParameter("q", query).
                setQueryParameter("key", reg.getApiKey()).
                setQueryParameter("type", "video").
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }


    @Override
    public RepositoryResponseMapping transform(JsonNode clientResponse ) {
        //Logger.info("Youtube Response: "+clientResponse.toString());
        YoutubeRepositoryResponseMapping respMapping=new YoutubeRepositoryResponseMapping();
        List<MultimediaContent> stages=new ArrayList<>();
        //List<JsonNode> items=clientResponse.findValues("items");
        if(clientResponse.get("nextPageToken")!=null){
            respMapping.setNextPage(clientResponse.get("nextPageToken").textValue());
        }
        if(clientResponse.get("items")!=null) {
            ArrayNode itemsArray = (ArrayNode) clientResponse.get("items");
            Iterator<JsonNode> itemsIterator = itemsArray.elements();
            List<JsonNode> itemsList = new ArrayList<JsonNode>();
            while (itemsIterator.hasNext()) {
                itemsList.add(itemsIterator.next());
         }
        /*final List<MultimediaContent> multimediaContents = new ArrayList<MultimediaContent>();
        if(items.isArray()) {
            items.forEach(( JsonNode i ) -> multimediaContents.add(getMultimediaContentFromItem(i)));
        }

        return multimediaContents;*/
            Function<JsonNode, MultimediaContent> convertToMultimediaContent =
                    jsonNode -> getMultimediaContentFromItem(jsonNode);
            if (!itemsList.isEmpty()) {
                stages = itemsList
                        .stream()
                        .map(convertToMultimediaContent)
                        .collect(Collectors.toList());
            }
        }else{
        	Logger.error("Youtube Response - tag items is missing");
        }
        respMapping.setMultimediaContents(stages);
        return respMapping;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m = new MultimediaContent();
        //m.setType(i.path("id").get("kind").asText());
        m.setType(MultimediaType.video);
        m.setURI(reg.getRepository().getUrlPrefix() + i.path("id").get("videoId").asText());
        m.setDownloadURI(reg.getRepository().getUrlPrefix() + i.path("id").get("videoId").asText());
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
        m.setSource(reg.getRepository());
/*
            License l = new License();
            l.setName("Youtube Standard");
            m.setLicense(l);
  */      
        //Logger.debug("Debug multimedia enum:"+m.toString());
        return m;
    }
}
