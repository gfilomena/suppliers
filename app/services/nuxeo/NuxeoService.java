package services.nuxeo;
import org.nuxeo.client.api.NuxeoClient;
import org.nuxeo.client.api.objects.Document;
import org.nuxeo.client.api.objects.Operation;
import org.nuxeo.client.api.objects.Documents;
import play.api.Logger;

public class NuxeoService {
	String url = "http://localhost:8080/nuxeo";
	NuxeoClient nuxeoClient;
	
	
	public  NuxeoService(){
		nuxeoClient = new NuxeoClient(url, "Administrator", "Administrator");
	}
	
	public String create(String title, String desc) {
		// Create a document
		Document folder = nuxeoClient.repository().fetchDocumentByPath("/default-domain");
		Document d = new Document("title", "File");
		d.setPropertyValue("dc:title", title);
		d.setPropertyValue("dc:description", desc);
		//d.setPropertyValue("dc:file", link);
		d = nuxeoClient.repository().createDocumentByPath("/default-domain", d);
		return d.getPath();
		
	}

	
	



	

	 

}
