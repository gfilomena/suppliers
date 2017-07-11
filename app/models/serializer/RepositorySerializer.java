package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.Repository;

import java.io.IOException;

/**
 * Created by Pasquale on 11/07/2017.
 */
public class RepositorySerializer extends StdSerializer<Repository> {

    public RepositorySerializer() {
        this(null);
    }

    public RepositorySerializer(Class<Repository> t) {
        super(t);
    }

    @Override
    public void serialize(
            Repository value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeStringField("name", value.getName());
        jgen.writeStringField("URI", value.getURI());
        jgen.writeStringField("urlPrefix", value.getUrlPrefix());
        jgen.writeEndObject();
    }
}
