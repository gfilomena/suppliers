package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.License;

import java.io.IOException;

/**
 * Created by Pasquale on 13/07/2017.
 */
public class LicenseSerializer extends StdSerializer<License> {

    public LicenseSerializer() {
        this(null);
    }

    public LicenseSerializer(Class<License> t) {
        super(t);
    }

    @Override
    public void serialize(
            License value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeStringField("name", value.getName());
        jgen.writeStringField("type", value.getType());
        jgen.writeStringField("url", value.getUrl());
        jgen.writeEndObject();
    }
}
