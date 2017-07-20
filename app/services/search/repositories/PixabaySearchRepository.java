package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.*;
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
import java.util.Map;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
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
            /*CompletionStage<JsonNode> jsonPromiseImage= ws.url(registration.getRepository().getURI()).
                    setQueryParameter("key", registration.getApiKey()).
                    setQueryParameter("q", query).
                    get().
                    thenApply(WSResponse::asJson);*/
            CompletionStage<JsonNode> jsonPromiseVideo = ws.url(registration.getRepository().getURI()+"videos/").
                    setQueryParameter("key", registration.getApiKey()).
                    setQueryParameter("q", query).
                    get().
                    thenApply(WSResponse::asJson);
            /*CompletionStage<JsonNode> combined=jsonPromiseImage.thenApply(l -> jsonPromiseVideo.thenApply(m -> {l.
            ;
            return l;}));*/
            return jsonPromiseVideo;
        }

        @Override
        public List<MultimediaContent> transform( JsonNode clientResponse ) {
            Logger.info("Pixabay Response: "+clientResponse.toString());
            List<MultimediaContent> stages=new ArrayList<>();
            //List<JsonNode> items=clientResponse.findValues("items");
            ArrayNode itemsArray = (ArrayNode) clientResponse.get("hits");
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
            Function<JsonNode, MultimediaContent> convertToMultimediaContent =
                    jsonNode -> getMultimediaContentFromItem(jsonNode);
            if(!itemsList.isEmpty()) {
                stages = itemsList
                        .stream()
                        //.filter(i -> i.get("mediatype").asText().equals("movies"))
                        .map(convertToMultimediaContent)
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
        if(!i.get("videos").get("large").isMissingNode() && (!i.get("videos").get("large").get("url").isMissingNode() || !(i.get("videos").get("large").get("url").asText()==null))) {
            m.setURI(i.get("videos").get("large").get("url").asText());
            m.setDownloadURI(i.get("videos").get("large").get("url").asText());
        }
        else if(!i.get("videos").get("medium").isMissingNode() && (!i.get("videos").get("medium").get("url").isMissingNode() || !(i.get("videos").get("medium").get("url").asText()==null))) {
            m.setURI(i.get("videos").get("medium").get("url").asText());
            m.setDownloadURI(i.get("videos").get("medium").get("url").asText());
        }
        else if(!i.get("videos").get("small").isMissingNode() && (!i.get("videos").get("small").get("url").isMissingNode() || !(i.get("videos").get("small").get("url").asText()==null))) {
            m.setURI(i.get("videos").get("small").get("url").asText());
            m.setDownloadURI(i.get("videos").get("small").get("url").asText());
        }
        else if(!i.get("videos").get("tiny").isMissingNode() && (!i.get("videos").get("tiny").get("url").isMissingNode() || !(i.get("videos").get("tiny").get("url").asText()==null))) {
            m.setURI(i.get("videos").get("tiny").get("url").asText());
            m.setDownloadURI(i.get("videos").get("tiny").get("url").asText());
        }

        m.setSource(registration.getRepository());
        m.setThumbnail(i.get("userImageURL").asText());
        m.setMetadata(i.get("tags").asText());
        m.setName(i.get("picture_id").asText());
        return m;
    }

    /**
     * Merge two JSON tree into one i.e mergedInTo.
     *
     * @param toBeMerged
     * @param mergedInTo
     */
    public static void merge(JsonNode toBeMerged, JsonNode mergedInTo) {
        Iterator<Map.Entry<String, JsonNode>> incomingFieldsIterator = toBeMerged.fields();
        Iterator<Map.Entry<String, JsonNode>> mergedIterator = mergedInTo.fields();

        while (incomingFieldsIterator.hasNext()) {
            Map.Entry<String, JsonNode> incomingEntry = incomingFieldsIterator.next();

            JsonNode subNode = incomingEntry.getValue();

            if (subNode.getNodeType().equals(JsonNodeType.OBJECT.OBJECT)) {
                boolean isNewBlock = true;
                mergedIterator = mergedInTo.fields();
                while (mergedIterator.hasNext()) {
                    Map.Entry<String, JsonNode> entry = mergedIterator.next();
                    if (entry.getKey().equals(incomingEntry.getKey())) {
                        merge(incomingEntry.getValue(), entry.getValue());
                        isNewBlock = false;
                    }
                }
                if (isNewBlock) {
                    ((ObjectNode) mergedInTo).replace(incomingEntry.getKey(), incomingEntry.getValue());
                }
            } else if (subNode.getNodeType().equals(JsonNodeType.ARRAY)) {
                boolean newEntry = true;
                mergedIterator = mergedInTo.fields();
                while (mergedIterator.hasNext()) {
                    Map.Entry<String, JsonNode> entry = mergedIterator.next();
                    if (entry.getKey().equals(incomingEntry.getKey())) {
                        updateArray(incomingEntry.getValue(), entry);
                        newEntry = false;
                    }
                }
                if (newEntry) {
                    ((ObjectNode) mergedInTo).replace(incomingEntry.getKey(), incomingEntry.getValue());
                }
            }
            ValueNode valueNode = null;
            JsonNode incomingValueNode = incomingEntry.getValue();
            switch (subNode.getNodeType()) {
                case STRING:
                    valueNode = new TextNode(incomingValueNode.textValue());
                    break;
                case NUMBER:
                    valueNode = new IntNode(incomingValueNode.intValue());
                    break;
                case BOOLEAN:
                    valueNode = BooleanNode.valueOf(incomingValueNode.booleanValue());
            }
            if (valueNode != null) {
                updateObject(mergedInTo, valueNode, incomingEntry);
            }
        }
    }

    private static void updateArray(JsonNode valueToBePlaced, Map.Entry<String, JsonNode> toBeMerged) {
        toBeMerged.setValue(valueToBePlaced);
    }

    private static void updateObject(JsonNode mergeInTo, ValueNode valueToBePlaced,
                                     Map.Entry<String, JsonNode> toBeMerged) {
        boolean newEntry = true;
        Iterator<Map.Entry<String, JsonNode>> mergedIterator = mergeInTo.fields();
        while (mergedIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = mergedIterator.next();
            if (entry.getKey().equals(toBeMerged.getKey())) {
                newEntry = false;
                entry.setValue(valueToBePlaced);
            }
        }
        if (newEntry) {
            ((ObjectNode) mergeInTo).replace(toBeMerged.getKey(), toBeMerged.getValue());
        }
    }
}
