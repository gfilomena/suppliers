import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.*;

import play.libs.Json;
import play.mvc.*;
import play.test.*;
import play.data.DynamicForm;
import play.data.validation.ValidationError;
import play.data.validation.Constraints.RequiredValidator;
import play.i18n.Lang;
import play.libs.F;
import play.libs.F.*;
import play.twirl.api.Content;
import services.search.repositories.PixabaySearchRepository;

import static play.test.Helpers.*;
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


}
