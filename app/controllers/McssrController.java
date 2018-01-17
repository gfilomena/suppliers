package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import com.fasterxml.jackson.databind.JsonNode;
import models.User;
import models.dao.UserDAO;
import models.dao.UserDAOImpl;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import services.db.MongoDBService;
import services.nuxeo.NuxeoService;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by Giuseppe on 01/09/2017.
 */
public class McssrController extends Controller {


    public static UserDAO userDAO = new UserDAOImpl(User.class, MongoDBService.getDatastore());


    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> create() {
        JsonNode json = request().body().asJson();
        Logger.info("json:" + json);
        NuxeoService ws = new NuxeoService();
        CompletionStage<JsonNode> r;
        r = ws.create(json);
        if (r != null) {
            return r.thenApply((p) -> {
                        Logger.debug("Json response from Nuxeo:\n" + p);
                        if (isPositiveResponse(p)) {
                            if (isResponseDocumentType(p)) {
                                return ok(p);
                            } else if (isResponseExceptionType(p)) {
                                String exceptionRespMessage = getExceptionResponseMessage(p);
                                return badRequest(exceptionRespMessage);
                            }
                        }
                        return badRequest(p);
                    }
            );
        } else {
            return CompletableFuture.supplyAsync(() -> badRequest("Error during the Connection with MCSSR: No response received!"));
        }
    }

    @Restrict({@Group("ADMIN"), @Group("USER")})
    @Security.Authenticated(Secured.class)
    public CompletionStage<Result> updateTags() {
        JsonNode json = request().body().asJson();
        Logger.info("json:" + json);
        NuxeoService ws = new NuxeoService();
        CompletionStage<JsonNode> r;
        r = ws.updateTags(json);
        if (r != null) {
            return r.thenApply((p) -> {
                        Logger.debug("Json response from Nuxeo:\n" + p);
                        if (isPositiveResponse(p)) {
                            if (isResponseDocumentType(p)) {
                                return ok(p);
                            } else if (isResponseExceptionType(p)) {
                                String exceptionRespMessage = getExceptionResponseMessage(p);
                                return badRequest(exceptionRespMessage);
                            }
                        }
                        return badRequest(p);
                    }
            );
        } else {
            return CompletableFuture.supplyAsync(() -> badRequest("Error during the Connection with MCSSR: No response received!"));
        }
    }


    private String getExceptionResponseMessage(JsonNode p) {
        StringBuilder sb = new StringBuilder();
        sb.append("Exception: ");
        sb.append(p.get("code").textValue() + "\n");

        if (!p.findPath("exception").isMissingNode()) {
            JsonNode excNode = p.findPath("exception");
            if (!excNode.findPath("cause").isMissingNode()) {
                JsonNode causeNode = excNode.findPath("cause");
                sb.append("Cause: ");
                sb.append(causeNode.get("className") + "\n");
                sb.append("Message: ");
                sb.append(causeNode.get("message") + "\n");
            }
        }
        return sb.toString();
    }

    private boolean isPositiveResponse(JsonNode p) {
        if (p.get("entity-type") == null || p.get("entity-type").textValue().isEmpty()) {
            return false;
        }
        return true;
    }

    private boolean isResponseDocumentType(JsonNode p) {
        if (p.get("entity-type").textValue().equals("document")) {
            return true;
        }
        return false;
    }

    private boolean isResponseExceptionType(JsonNode p) {
        if (p.get("entity-type").textValue().equals("exception")) {
            return true;
        }
        return false;
    }

}

