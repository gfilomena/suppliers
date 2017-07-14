package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
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
 * Created by Pasquale on 13/07/2017.
 */
public class PixabaySearchRepository implements SearchRepository {

        //private final String url=ConfigFactory.load().getString("multimedia.sources.internetArchive.url");
        private WSClient ws;
        private Registration registration;

        //private final String internetArchiveURLPrefix="https://archive.org/details/";

    @Inject
    public PixabaySearchRepository(WSClient ws, Registration registration){

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
            Logger.info("Pixabay search: "+query);
            CompletionStage<JsonNode> jsonPromise;
            jsonPromise = ws.url(registration.getRepository().getURI()).
                    setQueryParameter("key", registration.getApiKey()).
                    setQueryParameter("q", query).
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
                        .filter(i -> i.get("mediatype").asText().equals("movies"))
                        .map(jsonNode -> getMultimediaContentFromItem(jsonNode))
                        .collect(Collectors.toList());
            }
            return stages;
        }

    private MultimediaContent getMultimediaContentFromItem(JsonNode i){
        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m=new MultimediaContent();
        //m.setType(i.get("mediatype").asText());
        //Logger.debug("Type="+i.get("mediatype").asText());
        m.setType(MultimediaType.video);
        m.setFileExtension("video/mp4");
        m.setDownloadURI("https://archive.org/download/"+i.get("identifier").asText()+"/"+i.get("identifier").asText()+".mp4");
        m.setURI(registration.getRepository().getUrlPrefix()+i.get("identifier").asText());
        m.setSource(registration.getRepository());
        m.setName(i.get("title").asText());
        //Logger.debug("Debug internet archive multimedia enum:"+m.toString());
        return m;
    }
}
