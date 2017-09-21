package services.nuxeo;
import com.fasterxml.jackson.databind.JsonNode;
import com.typesafe.config.ConfigFactory;
import okhttp3.Response;
import org.nuxeo.client.api.NuxeoClient;
import play.Logger;
import play.libs.Json;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;


public class NuxeoService {
	NuxeoClient nuxeoClient;
	String mcssrUri=ConfigFactory.load().getString("mcssr.uri");


	public  NuxeoService(){
		Logger.debug("MCSSR URI="+mcssrUri);
		Logger.debug("MCSSR user="+ConfigFactory.load().getString("mcssr.username"));
		Logger.debug("MCSSR password="+ConfigFactory.load().getString("mcssr.password"));
		nuxeoClient = new NuxeoClient(mcssrUri, ConfigFactory.load().getString("mcssr.username"), ConfigFactory.load().getString("mcssr.password"));
		nuxeoClient = nuxeoClient.timeout(600).transactionTimeout(600);
	}
	
	public CompletionStage<JsonNode> create(JsonNode body) {
		Logger.info("create - body->"+body.toString());	
		// POST Method and Deserialize Json Response Payload
		Response response = nuxeoClient.post(mcssrUri+ConfigFactory.load().getString("mcssr.downloadWSUri"), body.toString());
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
	 

}
