package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.MultimediaContent;

import java.io.IOException;

/**
 * Created by Pasquale on 13/07/2017.
 */
public class MultimediaContentSerializer extends StdSerializer<MultimediaContent> {

    public MultimediaContentSerializer() {
        this(null);
    }

    public MultimediaContentSerializer(Class<MultimediaContent> t) {
        super(t);
    }

    @Override
    public void serialize(
            MultimediaContent value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        //jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeStringField("type", value.getType().name());
        jgen.writeStringField("fileExtension", value.getFileExtension());
        jgen.writeNumberField("length", value.getLength());
        jgen.writeStringField("name", value.getName());
        jgen.writeStringField("description", value.getDescription());
        jgen.writeStringField("thumbnail", value.getThumbnail());
        jgen.writeStringField("downloadURI", value.getDownloadURI());
        jgen.writeObjectField("source", value.getSource());
        jgen.writeObjectField("license", value.getLicense());
        jgen.writeObjectField("date", value.getDate());
        jgen.writeObjectField("metadata", value.getMetadata());
        jgen.writeStringField("uri", value.getURI());
        jgen.writeEndObject();
    }
}
