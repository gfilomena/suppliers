package utils;

import com.auth0.jwk.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import common.ConfigObj;
import exceptions.ValidationJWTException;

import java.io.UnsupportedEncodingException;
import java.security.interfaces.RSAPublicKey;

public class SecurityUtils {

    public static DecodedJWT verifyAndDecodeJWTToken(String token) throws ValidationJWTException {
        DecodedJWT jwt = null;
        try {
            jwt = JWT.decode(token);
        } catch (JWTDecodeException exception) {
            //Invalid token
            exception.printStackTrace();
            throw new ValidationJWTException("Impossible to decode token. Invalid Token." + exception.getMessage());
        }
        try {
            String keyId = jwt.getKeyId();
            String domain=jwt.getIssuer();
            if (jwt.getAlgorithm().equals("RS256")) {
                jwt = verifySignatureRS256(token, domain, keyId);
            } else if (jwt.getAlgorithm().equals("HS256")) {
                jwt = verifySignatureHS256(token, domain);
            } else {
                throw new ValidationJWTException("No signature algorithm compatible available in JWT. Try with RS256 or HS256");
            }
        } catch (ValidationJWTException e) {
            e.printStackTrace();
            throw e;
        }
        return jwt;
    }

    private static DecodedJWT verifySignatureRS256(String token, String domain, String keyId) throws ValidationJWTException {
        JwkProvider provider = new UrlJwkProvider(domain);
        DecodedJWT jwt = null;
        Jwk jwk = null;
        try {
            jwk = provider.get(keyId); //throws Exception when not found or can't get one
        } catch (JwkException e) {
            e.printStackTrace();
            throw new ValidationJWTException("No key id found or can't get one." + e.getMessage());
        }
        try {
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(domain)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (JWTVerificationException exception) {
            exception.printStackTrace();
            throw new ValidationJWTException("Error during he verification of the JWT." + exception.getMessage());
        } catch (InvalidPublicKeyException e) {
            e.printStackTrace();
            throw new ValidationJWTException("No valid public key available." + e.getMessage());
        }
        return jwt;
    }

    private static DecodedJWT verifySignatureHS256(String token, String domain) throws ValidationJWTException {
        DecodedJWT jwt = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(ConfigObj.configuration.getString("play.crypto.secret"));
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(domain)
                    .build(); //Reusable verifier instance
            jwt = verifier.verify(token);
        } catch (UnsupportedEncodingException exception) {
            throw new ValidationJWTException("UTF-8 encoding not supported");//UTF-8 encoding not supported
        } catch (JWTVerificationException exception) {
            throw new ValidationJWTException("Invalid signature/claims");//Invalid signature/claims
        }
        return jwt;
    }
}
