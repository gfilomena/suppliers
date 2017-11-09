package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.*;

import services.search.semantic.SemanticAnalyzer;

import java.io.File;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class SemanticController extends Controller {

    @Security.Authenticated(Secured.class)
    @BodyParser.Of(BodyParser.Json.class)
    public Result urlAnnotations() {
        JsonNode json = request().body().asJson();
        String url = json.findPath("url").textValue();
        if (url == null)
            return badRequest("Missing json parameter: url");
        else {
            try {
                SemanticAnalyzer semAnalyzer = new SemanticAnalyzer();
                return ok(semAnalyzer.getUrlAnnotations(url));
            } catch (java.lang.Exception e) {
                return internalServerError("Semantic Analyzer failure: " + e);
            }
        }
    }

    @Security.Authenticated(Secured.class)
    @BodyParser.Of(BodyParser.MultipartFormData.class)
    public Result fileAnnotations() {
        Http.MultipartFormData<File> body = request().body().asMultipartFormData();
        Http.MultipartFormData.FilePart<File> doc = body.getFile("doc");
        if (doc != null) {
            try {
                SemanticAnalyzer semAnalyzer = new SemanticAnalyzer();
                return ok(semAnalyzer.getFileAnnotations(doc.getFile()));
            } catch (java.lang.Exception e) {
                e.printStackTrace();
                return internalServerError("Semantic Analyzer failure: " + e);
            }
        } else {
            return badRequest("Missing file.");
        }
    }

}