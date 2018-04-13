package services;

import com.fasterxml.jackson.databind.JsonNode;
import exceptions.MultimediaSearchServiceException;
import exceptions.UserNotFoundException;
import models.MultimediaContent;
import models.SearchResult;
import models.User;
import models.response.RepositoryResponseMapping;
import services.search.repositories.SearchRepository;

import java.util.List;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 16/03/2017.
 */
public interface SearchService {

    List<CompletionStage<RepositoryResponseMapping>> dispatch(List<SearchRepository> repositories, List<String> keywords);

    CompletionStage<List<MultimediaContent>> aggregate(List<CompletionStage<RepositoryResponseMapping>> stages);

    CompletionStage<SearchResult> search(JsonNode jsonRequest, User user);

    void saveSearchResult(SearchResult searchResult);

    CompletionStage<List<SearchResult>> getSearchResultsByUser(User user);

    void deleteSearchResultsByIds(String ids) throws UserNotFoundException, MultimediaSearchServiceException;



}
