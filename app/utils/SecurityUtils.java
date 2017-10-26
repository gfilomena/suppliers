package utils;

import com.auth0.jwk.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import exceptions.ValidationJWTException;

import java.security.interfaces.RSAPublicKey;

public class SecurityUtils {

    public static DecodedJWT verifyAndDecodeJWTToken(String token, String domain, String issuer) throws ValidationJWTException {
        DecodedJWT jwt=null;
        try {
            jwt = JWT.decode(token);
        } catch (JWTDecodeException exception){
            //Invalid token
        }
        String keyId=jwt.getKeyId();
        JwkProvider provider = new UrlJwkProvider(domain);
        Jwk jwk=null;
        try {
            jwk = provider.get(keyId); //throws Exception when not found or can't get one
        } catch (JwkException e) {
            e.printStackTrace();
            throw new ValidationJWTException("No key id found or can't get one.");
        }
        try {
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey)jwk.getPublicKey(),null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (JWTVerificationException exception){
            exception.printStackTrace();
            throw new ValidationJWTException("Error during he verification of the JWT.");
        } catch (InvalidPublicKeyException e) {
            e.printStackTrace();
            throw new ValidationJWTException("No valid public key available.");
        }
        return jwt;
    }
}
