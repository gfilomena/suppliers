package services.search.repositories.response;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;

import java.util.List;

/**
 * Created by Pasquale on 16/03/2017.
 */
public interface RepositoryResponseTransformer {

    List<MultimediaContent> tranform( JsonNode clientResponse);
}
