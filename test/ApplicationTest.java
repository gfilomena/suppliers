import java.io.File;
import java.io.IOException;
import java.net.URL;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.commons.io.FileUtils;
import org.junit.*;

import play.libs.Json;
import services.search.repositories.PixabaySearchRepository;

import static org.junit.Assert.*;


/**
 *
 * Simple (JUnit) tests that can call all parts of a play app.
 * If you are interested in mocking a whole application, see the wiki for more details.
 *
 */
public class ApplicationTest {

    @Test
    public void simpleCheck() {
        int a = 1 + 1;
        assertEquals(2, a);
    }

    /*@Test
    public void renderTemplate() {
        Content html = views.html.index.render("Your new application is ready.");
        assertEquals("text/html", html.contentType());
        assertTrue(html.body().contains("Your new application is ready."));
    }*/

    @Test
    public void testMergeJson() {
        String a="{\n" +
                "  \"keyWords\": [\n" +
                "    \"flower\"\n" +
                "  ],\n" +
                "  \"endDate\": \"2017-07-21T09:33:13.246Z\",\n" +
                "  \"nOfResults\": 292\n" +
                "}";
        String b="{\n" +
                "  \"keyWords\": [\n" +
                "    \"ronaldo\"\n" +
                "  ],\n" +
                "  \"endDate\": \"adsasdad\",\n" +
                "  \"nOfResults\": 444\n" +
                "}";
        JsonNode aJ=Json.toJson(a);
        JsonNode bJ=Json.toJson(b);
        System.out.println("aJ="+ aJ.asText());
        System.out.println("bJ="+bJ.asText());
        JsonNode mJ=PixabaySearchRepository.merge(aJ,bJ);
        System.out.println("mJ="+mJ.asText());
        assertNotEquals(aJ,bJ);
    }

    @Test
    public void testDownloadURI() {
        String toFile ="e-watch-tv-tv-screen-monitor-589640/";
        String fromFile ="https://pixabay.com/get/ed37b90c29f31c2ad65a5854e3444f96e57ee7c818b4114491f0c478a3e8_640.jpg";

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
