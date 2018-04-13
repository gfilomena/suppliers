package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import models.MultimediaContent;
import models.License;
import models.MultimediaType;
import models.Registration;
import models.response.VimeoRepositoryResponseMapping;
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
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;
import java.text.SimpleDateFormat;
import java.text.ParseException;
/**
 * Created by Giuseppe on 20/12/2017.
 */
public class VimeoSearchRepository implements SearchRepository {

    //private final String key= ConfigFactory.load().getString("multimedia.sources.pexels.api.key");
    //private final String url=ConfigFactory.load().getString("multimedia.sources.pexels.url");
    private WSClient ws;
    private Registration registration;

    @Inject
    public VimeoSearchRepository(WSClient ws, Registration registration){

        this.ws=ws;
        this.registration=registration;
    }

    @Override
    public CompletionStage<JsonNode> executeQuery( List<String> keyWords ) {
        String query=String.join(" ", keyWords);
        Logger.info("Vimeo search: "+query);
        //Logger.info("Vimeo search getToken(): "+registration.getToken());
        CompletionStage<JsonNode> jsonPromise;
        jsonPromise = ws.url(registration.getRepository().getURI()+"videos/").
                setHeader("Authorization", "Bearer "+registration.getToken()).
                setQueryParameter("query", query).
                get().
                thenApply(WSResponse::asJson);
        return jsonPromise;
    }

    @Override
    public RepositoryResponseMapping transform(JsonNode clientResponse ) {
        //Logger.info("Vimeo Response: "+clientResponse.toString());
        List<MultimediaContent> stages=new ArrayList<>();
        VimeoRepositoryResponseMapping respMap=new VimeoRepositoryResponseMapping();
        if(clientResponse.get("total")!=null){
            respMap.setnOfResults(clientResponse.get("total").asInt());
            
            if(clientResponse.get("paging").get("next_page")!=null){
                respMap.setNextPage(clientResponse.get("paging").get("next_page").asText());
            }
            if(clientResponse.get("paging").get("previous")!=null){
                respMap.setPreviousPage(clientResponse.get("paging").get("previous").asText());
            }
        }
        if(clientResponse.get("data")!=null){
	        ArrayNode itemsArray = (ArrayNode) clientResponse.get("data");
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
        }
        respMap.setMultimediaContents(stages);
        return respMap;
    }

    private MultimediaContent getMultimediaContentFromItem( JsonNode i ) {
        //Logger.info("JsonNode i : "+i);

        MultimediaContent m = new MultimediaContent();
        m.setType(MultimediaType.video);
        String[] videoarr = i.get("link").asText().split("/");
        m.setURI(registration.getRepository().getUrlPrefix()+videoarr[videoarr.length-1]);
        m.setDownloadURI(registration.getRepository().getUrlPrefix()+videoarr[videoarr.length-1]);
        m.setName(i.get("name").asText());
        m.setThumbnail(i.get("pictures").get("sizes").get(2).get("link").asText());
        //m.setFileExtension(fileToFileExtension(i.get("link").asText()));
        m.setSource(registration.getRepository());
        // set tags
        String[] tags = new String[i.get("tags").size()];
        for(int j = 0; j < i.get("tags").size(); j++) {
            tags[j] = i.get("tags").get(j).get("name").asText();
        }
        m.setMetadata(tags);

       
        if(i.get("license") != null) {
        	String lic = i.get("license").asText();
        	License l = new License();
            
            if(lic==null || lic.equals("null")) {
            	 //Logger.info("License:"+lic);
                 l.setName("");
            }else{
            	 l.setName(lic);
            }
            m.setLicense(l);
            
        }
        
        
        

       if( i.get("created_time") != null ) {
           SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss+00:00");
           try {
               m.setDate(sdf.parse(i.get("created_time").asText()));
           } catch (ParseException e) {
               e.printStackTrace();
           }
       }


        //Logger.info("MultimediaContent  : "+m);
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
