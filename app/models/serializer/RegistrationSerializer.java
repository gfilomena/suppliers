package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.Registration;

import java.io.IOException;

/**
 * Created by Pasquale on 12/07/2017.
 */
public class RegistrationSerializer extends StdSerializer<Registration> {

    public RegistrationSerializer() {
        this(null);
    }

    public RegistrationSerializer(Class<Registration> t) {
        super(t);
    }

    @Override
    public void serialize(
            Registration value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeStringField("user", value.getUser().getId().toHexString());
        jgen.writeStringField("repository", value.getRepository().getId().toHexString());
        jgen.writeStringField("apiKey", value.getApiKey());
        jgen.writeStringField("username", value.getUsername());
        jgen.writeStringField("password", value.getPassword());
        jgen.writeStringField("token", value.getToken());
        jgen.writeBooleanField("enabled", value.isEnabled());
        jgen.writeEndObject();
    }
}
