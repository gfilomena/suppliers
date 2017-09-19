package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.typesafe.config.ConfigFactory;
import models.MultimediaContent;
import models.MultimediaType;
import models.Registration;
import models.response.InternetArchiveRepositoryResponseMapping;
import models.response.RepositoryResponseMapping;
import models.response.ResponseMapping;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.activation.MimetypesFileTypeMap;
import javax.inject.Inject;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Pasquale on 24/04/2017.
 */
public class InternetArchiveSearchRepository implements SearchRepository {

    //private final String url=ConfigFactory.load().getString("multimedia.sources.internetArchive.url");
    private WSClient ws;
    private Registration registration;

    //private final String internetArchiveURLPrefix="https://archive.org/details/";

    @Inject
    public InternetArchiveSearchRepository(WSClient ws, Registration registration){

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
        Logger.info("InternetArchive search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(registration.getRepository().getURI()).
                setQueryParameter("debug", "false").
                setQueryParameter("xvar", "production").
                setQueryParameter("total_only", "false").
                setQueryParameter("count", "200").
                setQueryParameter("fields", "title,description,downloads,identifier,source,type,mediatype,external-identifier,licenseurl,format,bith,collection").
                setQueryParameter("q", query).
                setQueryParameter("sorts", "downloads desc").
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }

    @Override
    public RepositoryResponseMapping transform(JsonNode clientResponse ) {
        Logger.debug("Internet Archive Response: "+clientResponse.toString());
        List<MultimediaContent> stages=new ArrayList<>();
        InternetArchiveRepositoryResponseMapping respMap=new InternetArchiveRepositoryResponseMapping();
        if(clientResponse.get("count")!=null){
            respMap.setnOfResults(clientResponse.get("count").asInt());
        }
        if(clientResponse.get("cursor")!=null){
            respMap.setCursor(clientResponse.get("cursor").asText());
        }

        ArrayNode itemsArray = (ArrayNode) clientResponse.get("items");
        Iterator<JsonNode> itemsIterator = itemsArray.elements();
        List<JsonNode> itemsList=new ArrayList<JsonNode>();
        while(itemsIterator.hasNext()){
            itemsList.add(itemsIterator.next());
        }
        
        List<String> mediatypes = Arrays.asList("movies", "audio", "image" );

        if(!itemsList.isEmpty()) {
            stages = itemsList
                    .stream()
                    //.filter(i -> Stream.of(mediatypes).anyMatch(x -> x.equals(i.get("mediatype").asText())))
                    .map(jsonNode -> getMultimediaContentFromItem(jsonNode))
                    .collect(Collectors.toList());
        }
        respMap.setMultimediaContents(stages);
        return respMap;
    }
    private MultimediaContent getMultimediaContentFromItem(JsonNode i){
/*        //CompletionStage<MultimediaContent> multimediaContent=CompletableFuture.supplyAsync( () -> {
        MultimediaContent m=new MultimediaContent();
        //m.setType(i.get("mediatype").asText());
        //Logger.debug("Type="+i.get("mediatype").asText());
        m.setType(MultimediaType.video);
        m.setFileExtension("video/mp4");
        m.setDownloadURI("");
        m.setURI(registration.getRepository().getUrlPrefix()+i.get("identifier").asText());
        m.setSource(registration.getRepository());
        m.setName(i.get("title").asText());
        //Logger.debug("Debug internet archive multimedia enum:"+m.toString());
        return m;
*/
 
    	String mediatype = i.get("mediatype").asText();

	    MultimediaContent m=new MultimediaContent();
		if(mediatype == "movies"){ m.setType(MultimediaType.video); }
	
	    else if(mediatype == "audio"){ m.setType(MultimediaType.audio); }
	       
	    else if(mediatype == "image"){ m.setType(MultimediaType.image); }
	    else{ m.setType(MultimediaType.video); }


   //m.setFileExtension("video/mp4");
   //m.setDownloadURI("");
   m.setURI(registration.getRepository().getUrlPrefix()+i.get("identifier").asText());
   m.setSource(registration.getRepository());
   m.setName(i.get("title").asText());
   
   return m;


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
