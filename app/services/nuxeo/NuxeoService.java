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
		
		//DownloadURI("", "");
		
		String url = "http://localhost:8080/nuxeo/site/automation/Document.DownloadMultimediaContent";
		//String body2 = "{ \"params\" : { \"path\":\"/default-domain\",  \"url\":\"https://en.wikipedia.org/wiki/Ronaldo_Souza\",  \"fileName\":\"Ronaldo Giuseppe Souza\",  \"mimeType\":\"text/html\",  \"tags\":\"null\",  \"type\":\"File\"}}";
		Logger.info("create - body->"+body.toString());	
		// PUT Method and Deserialize Json Response Payload
		Response response = nuxeoClient.post(url, body.toString());
		try {
			final String json = response.body().string();
			if(json != null) {
				return CompletableFuture.supplyAsync(() -> Json.toJson(json));
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	     



		
	}
	
	
//	 public void DownloadURI(String fromFile,String toFile ) {
//
//	        fromFile = "https://ia800304.us.archive.org/18/items/CR7_Skills_Vs_AC_Milan/CR7_Skills_Vs_AC_Milan.mp4";
//	        toFile = "C:\\CR7_Skills_Vs_AC_Milan.mp4";
//
//	        try {
//
//	            //connectionTimeout, readTimeout = 10 seconds
//	            FileUtils.copyURLToFile(new URL(fromFile), new File(toFile), 10000, 10000);
//
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	        }
//
//	    }

	

	 

}
