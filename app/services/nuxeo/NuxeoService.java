package services.nuxeo;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.nuxeo.client.api.NuxeoClient;
import org.nuxeo.client.api.objects.Document;

import com.fasterxml.jackson.databind.JsonNode;

import okhttp3.Response;
import play.Logger;
import play.libs.Json;


public class NuxeoService {
	String url = "http://localhost:8080/nuxeo";
	NuxeoClient nuxeoClient;
	
	Document document;
	public  NuxeoService(){
		nuxeoClient = new NuxeoClient(url, "Administrator", "Administrator");
	}
	
	public CompletionStage<JsonNode> create(JsonNode body) {
		//String Imageurl = body.get("params").get("url").asText();
		//String filename = body.get("params").get("fileName").asText();
		//DownloadURI(Imageurl, filename);
		
		String url = "http://localhost:8080/nuxeo/site/automation/Document.DownloadMultimediaContent";
		//String body2 = "{ \"params\" : { \"path\":\"/default-domain\",  \"url\":\"https://en.wikipedia.org/wiki/Ronaldo_Souza\",  \"fileName\":\"Ronaldo Giuseppe Souza\",  \"mimeType\":\"text/html\",  \"tags\":\"null\",  \"type\":\"File\"}}";
		Logger.info("create - body->"+body.toString());	
		// PUT Method and Deserialize Json Response Payload
		Response response = nuxeoClient.post(url, body.toString());
		Logger.info("response - code"+response.code());
		//Logger.info("response - json->"+response.body().string());	
		try {
			String json = response.body().string();
			
			if(json != null) {
				return CompletableFuture.supplyAsync(() -> Json.toJson(json));
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
	
	
	 public void DownloadURI(String fromFile,String toFile ) {

		// toFile ="https://pixabay.com/en/apple-watch-tv-tv-screen-monitor-589640/";
		// toFile ="https://cdn.pixabay.com/photo/2015/01/05/19/50/apple-589640_150.jpg";
		 //fromFile ="https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg";
		 
	        //fromFile = "https://static.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg";
	        toFile = "C:\\"+toFile;

	        try {

	            //connectionTimeout, readTimeout = 10 seconds
	            FileUtils.copyURLToFile(new URL(fromFile), new File(toFile), 10000, 10000);

	        } catch (IOException e) {
	            e.printStackTrace();
	        }

	    }

	

	 

}
