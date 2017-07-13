package models.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import models.SearchResult;

import java.io.IOException;

/**
 * Created by Pasquale on 12/07/2017.
 */
public class SearchResultSerializer extends StdSerializer<SearchResult> {

    public SearchResultSerializer() {
        this(null);
    }

    public SearchResultSerializer(Class<SearchResult> t) {
        super(t);
    }

    @Override
    public void serialize(
            SearchResult value, JsonGenerator jgen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        jgen.writeStartObject();
        jgen.writeStringField("id", value.getId().toHexString());
        jgen.writeObjectField("keyWords", value.getKeyWords());
        jgen.writeObjectField("multimediaContents", value.getMultimediaContents());
        jgen.writeEndObject();
    }

}
