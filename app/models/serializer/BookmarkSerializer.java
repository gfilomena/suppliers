package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.Bookmark;

import java.io.IOException;

/**
 * Created by Pasquale on 13/07/2017.
 */
public class BookmarkSerializer extends StdSerializer<Bookmark> {

    public BookmarkSerializer() {
        this(null);
    }

    public BookmarkSerializer(Class<Bookmark> t) {
        super(t);
    }

    @Override
    public void serialize(
            Bookmark value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeObjectField("user", value.getUser());
        jgen.writeObjectField("multimediaContent", value.getMultimediaContent());
        jgen.writeObjectField("date" , value.getDate());
        jgen.writeEndObject();
    }
}
