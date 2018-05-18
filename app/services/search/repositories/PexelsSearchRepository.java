package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import models.License;
import models.MultimediaContent;
import models.MultimediaType;
import models.Registration;
import models.response.PexelsRepositoryResponseMapping;
import models.response.RepositoryResponseMapping;
import play.Logger;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import services.LicenseService;

import javax.activation.MimetypesFileTypeMap;
import javax.inject.Inject;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
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
    private LicenseService licenseService;

    @Inject
    public PexelsSearchRepository(WSClient ws, Registration registration){

        this.ws=ws;
        this.registration=registration;
        this.licenseService=new LicenseService();
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords ) {
        String query=String.join(" ", keyWords);
        Logger.info("Pexels search: "+query);
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(registration.getRepository().getURI()).
                setHeader("Authorization", registration.getApiKey()).
                setQueryParameter("query", query).
                setQueryParameter("per_page", "40").
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }

    @Override
    public RepositoryResponseMapping transform(JsonNode clientResponse ) {
        //Logger.info("Pexels Response: "+clientResponse.toString());
        List<MultimediaContent> stages=new ArrayList<>();
        PexelsRepositoryResponseMapping respMap=new PexelsRepositoryResponseMapping();
        if(clientResponse.get("total_results")!=null){
            respMap.setnOfResults(clientResponse.get("total_results").asInt());
        }
        if(clientResponse.get("next_page")!=null){
            respMap.setNextPage(clientResponse.get("next_page").asText());
        }
        if(clientResponse.get("prev_page")!=null){
            respMap.setPreviousPage(clientResponse.get("prev_page").asText());
        }
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

        respMap.setMultimediaContents(stages);
        return respMap;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        MultimediaContent m = new MultimediaContent();
        m.setType(MultimediaType.image);
        m.setURI(i.get("src").get("original").asText());
        m.setDownloadURI(i.get("src").get("original").asText());
        m.setName(i.get("id").asText());
        m.setThumbnail(i.get("src").get("medium").asText());   
        //m.setDescription("photographer:"+i.get("photographer").asText());
        /*License lic = new License();
        lic.setName("CC0");*/
        m.setLicense(licenseService.getByNameOrCreate("CC0"));
        
        m.setFileExtension(fileToFileExtension(i.get("src").get("original").asText()));
        m.setSource(registration.getRepository());
        //Logger.debug("Debug  pexeòs multimedia enum:"+m.toString());
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
