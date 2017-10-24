package services.user;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 19/04/2017.
 */
public class UserService {

    private WSClient ws;

    @Inject
    public UserService(WSClient ws){

        this.ws=ws;
    }

    public UserService(){}

    public CompletionStage<WSResponse> authorize( ) {
        CompletionStage<WSResponse> jsonPromise= ws.url("https://producer-account.eu.auth0.com/authorize").
                setQueryParameter("client_id", "chMO60cB8YoeG0PCSisJ6WZA73WOaya7").
                setQueryParameter("audience", "producer-account.eu.auth0.com").
                setQueryParameter("scope", "openid").
                setQueryParameter("response_type", "code").
                setQueryParameter("redirect_uri", "http://localhost:9000/callback").
                setQueryParameter("state", "STATE").
                get();

        return jsonPromise;
    }


}
