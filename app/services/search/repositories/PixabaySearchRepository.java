package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.*;

import models.License;
import models.MultimediaContent;
import models.MultimediaType;
import models.Registration;
import models.response.PixabayRepositoryResponseMapping;
import models.response.RepositoryResponseMapping;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.activation.MimetypesFileTypeMap;
import javax.inject.Inject;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;
import java.util.function.BiFunction;
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
            String query=String.join(" ", keyWords);
            Logger.info("Pixabay search: "+query);
            
            CompletionStage<JsonNode> jsonPromiseImage= ws.url(registration.getRepository().getURI()).
                    setQueryParameter("key", registration.getApiKey()).
                    setQueryParameter("q", query).
                    setQueryParameter("per_page", "200").
                    get().
                    thenApply(WSResponse::asJson);
            JsonNode jImg = null, jVid=null;
            try {
                jImg=jsonPromiseImage.toCompletableFuture().get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            CompletionStage<JsonNode> jsonPromiseVideo = ws.url(registration.getRepository().getURI()+"videos/").
                    setQueryParameter("key", registration.getApiKey()).
                    setQueryParameter("q", query).
                    setQueryParameter("per_page", "200").
                    get().
                    thenApply(WSResponse::asJson);
            try {
                jVid=jsonPromiseVideo.toCompletableFuture().get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            BiFunction<JsonNode, JsonNode, JsonNode> unifier= (x,y) ->{
                JsonNode z=merge(x,y);
                return z;
            };


            JsonNode finalJVid = jVid;
            JsonNode finalJImg = jImg;
            return CompletableFuture.supplyAsync( () -> {return unifier.apply(finalJImg, finalJVid);});

        }

        @Override
        public RepositoryResponseMapping transform(JsonNode clientResponse ) {
            //Logger.info("Pixabay Response: "+clientResponse.toString());
            List<MultimediaContent> stages=new ArrayList<>();
            //List<JsonNode> items=clientResponse.findValues("items");
            PixabayRepositoryResponseMapping respMap=new PixabayRepositoryResponseMapping();
            if(clientResponse.get("totalHits")!=null){
                respMap.setnOfResults(clientResponse.get("totalHits").asInt());
            }else{
            	Logger.error("Pixabay Response - tag totalHits is missing");
            }
            
            if(clientResponse.get("hits")==null){
            	Logger.error("Pixabay Response - tag hits is missing");
            }
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
            respMap.setMultimediaContents(stages);
            return respMap;
        }

    private MultimediaContent getMultimediaContentFromItem(JsonNode i){
        MultimediaContent m=new MultimediaContent();
        if(i.get("webformatURL")!=null && !i.get("webformatURL").isMissingNode()) { // is an image type item
            setImageItem(i, m);
        }else{ // is a video type item
            setVideoItem(i,m);
        }
        return m;
    }

    private void setImageItem(JsonNode i, MultimediaContent m) {
        m.setType(MultimediaType.image);
        if(i.get("webformatURL")!=null && !i.get("webformatURL").isMissingNode()) {
            m.setFileExtension(fileToFileExtension(i.get("webformatURL").asText()));
            m.setURI(i.get("webformatURL").asText());
            m.setDownloadURI(i.get("webformatURL").asText());
        }
        m.setSource(registration.getRepository());
        m.setThumbnail(i.get("previewURL").asText());
        m.setMetadata(i.get("tags").asText().replaceAll("^[,\\s]+", "").split("[,\\s]+"));
        m.setName(i.get("id").asText());
        m.setDescription("User:"+i.get("user").asText());
        License lic = new License();
        lic.setName("CC0");
        m.setLicense(lic);
    }

    private void setVideoItem(JsonNode i, MultimediaContent m){
        if(!i.get("videos").get("large").isMissingNode()) {
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
            m.setThumbnail("https://i.vimeocdn.com/video/"+i.get("picture_id").asText()+"_295x166.jpg");
            m.setMetadata(i.get("tags").asText().replaceAll("^[,\\s]+", "").split("[,\\s]+"));
            m.setName(i.get("id").asText());
        
            m.setDescription("User:"+i.get("user").asText());
            
            License lic = new License();
            lic.setName("CC0");
            m.setLicense(lic);
           	
        }
    }

    public static JsonNode merge(JsonNode imagesNode, JsonNode videosNode) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode mergedNode=JsonNodeFactory.instance.objectNode();
       /* try {
            System.out.println("Images Node="+mapper.writerWithDefaultPrettyPrinter().writeValueAsString(imagesNode));
            System.out.println("Videos Node="+mapper.writerWithDefaultPrettyPrinter().writeValueAsString(videosNode));
            System.out.println("Before Merged Node="+mapper.writerWithDefaultPrettyPrinter().writeValueAsString(mergedNode));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }*/
        if(imagesNode.get("totalHits")!=null && videosNode.get("totalHits")!=null){
            ((ObjectNode) mergedNode).put("totalHits",imagesNode.get("totalHits").asInt()+videosNode.get("totalHits").asInt());
        }
        ArrayNode hitsMergedArray = mapper.createArrayNode();

        JsonNode imagesHits = imagesNode.path("hits");
        if (imagesHits.isArray()) {
            for (JsonNode node : imagesHits) {
                hitsMergedArray.add(node);
            }
        }

        JsonNode videosHits = videosNode.path("hits");
        if (videosHits.isArray()) {
            for (JsonNode node : videosHits) {
                hitsMergedArray.add(node);
            }
        }
        ((ObjectNode) mergedNode).set("hits", hitsMergedArray);

        if(imagesNode.get("total")!=null && videosNode.get("total")!=null){
            ((ObjectNode) mergedNode).put("total",imagesNode.get("total").asInt()+videosNode.get("total").asInt());
        }

        /*try {
            System.out.println("After Merged Node="+mapper.writerWithDefaultPrettyPrinter().writeValueAsString(mergedNode));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }*/


        return mergedNode;
    }

    
    private String fileToFileExtension(String path){
    	URL url;
    	String mimetype = null;
		try {
			url = new URL(path);
			File f = new File(url.getFile());
	        final MimetypesFileTypeMap mtftp = new MimetypesFileTypeMap();
	        mimetype = mtftp.getContentType(f);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return mimetype;
    }
}
