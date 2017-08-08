package services.search.repositories;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import models.response.RepositoryResponseMapping;
import models.response.ResponseMapping;

import java.util.List;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 15/03/2017.
 */
public interface SearchRepository {

    CompletionStage<JsonNode> executeQuery( List<String> keyWords);

    RepositoryResponseMapping transform(JsonNode clientResponse);

}
