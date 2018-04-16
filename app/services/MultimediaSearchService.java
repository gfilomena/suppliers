package services;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.inject.Inject;
import exceptions.MultimediaSearchServiceException;
import models.MultimediaContent;
import models.Registration;
import models.SearchResult;
import models.User;
import models.dao.SearchResultDAO;
import models.dao.SearchResultDAOImpl;
import models.response.RepositoryResponseMapping;
import org.bson.types.ObjectId;
import play.libs.concurrent.Futures;
import play.libs.ws.WSClient;
import services.db.MongoDBService;
import services.search.repositories.SearchRepository;
import services.search.repositories.SearchRepositoryFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class MultimediaSearchService implements SearchService {

    private WSClient wsclient;
    private SearchResultDAO searchResultDAO = new SearchResultDAOImpl(SearchResult.class, MongoDBService.getDatastore());

    private RegistrationService registrationService=new RegistrationService();

    @Inject
    public MultimediaSearchService(WSClient wsClient) {
        this.wsclient = wsClient;
    }

    public MultimediaSearchService(){

    }

    @Override
    public List<CompletionStage<RepositoryResponseMapping>> dispatch(List<SearchRepository> repositories, List<String> keyWords) {
        List<CompletionStage<RepositoryResponseMapping>> s;
        s = repositories
                .stream()
                .map(repository -> {
                    CompletionStage<JsonNode> jsonRes = repository.executeQuery(keyWords);
                    CompletionStage<RepositoryResponseMapping> transformed = jsonRes.thenApply(j -> repository.transform(j));
                    return transformed;
                })
                .collect(Collectors.toList());
        return s;
    }

    @Override
    public CompletionStage<List<MultimediaContent>> aggregate(List<CompletionStage<RepositoryResponseMapping>> stages) {
        return Futures
                .sequence(stages)
                .thenApply(responses -> {
                    List<MultimediaContent> mulcon = new ArrayList<MultimediaContent>();
                    responses
                            .stream()
                            .forEach(mc -> mulcon.addAll(mc.getMultimediaContents()));
                    return mulcon;
                });
    }

    @Override
    public CompletionStage<SearchResult> search(JsonNode jsonRequest, User user) {
        List<String> keyWords = getKeyWords(jsonRequest);
        // load dinamically registered and enabled repositories
        SearchRepositoryFactory srf = new SearchRepositoryFactory();
        Stream<Registration> userRepositories = registrationService.findRegistrationByUser(user).stream();
        List<SearchRepository> repositories = userRepositories.
                filter(sr -> sr.isEnabled()).
                map(r -> {
                    Class[] params = {WSClient.class, Registration.class};
                    Object[] values = {wsclient, r};
                    return srf.newInstance(r.getRepository().getName(), params, values);
                }).collect(Collectors.toList());
        List<CompletionStage<RepositoryResponseMapping>> dispatched = dispatch(repositories,keyWords);
        CompletionStage<List<MultimediaContent>> aggregated = aggregate(dispatched);
        CompletionStage<SearchResult> transformedQuery = aggregated.thenApply(l -> {
            SearchResult qr = new SearchResult();
            //l.forEach(mc -> multimediaContentDAO.save(mc));
            qr.setKeyWords(keyWords);
            qr.setMultimediaContents(l);
            qr.setUser(user);
            qr.setnOfResults(l.size());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            try {
                qr.setInDate(sdf.parse(jsonRequest.get("inDate").textValue()));
                qr.setEndDate(sdf.parse(jsonRequest.get("endDate").textValue()));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return qr;
        });
        //transformedQuery.thenAccept(p -> saveSearchResult(p));
        return transformedQuery;
    }

    private List<String> getKeyWords(JsonNode jsonRequest) {
        List<String> keyWords = new ArrayList<String>();
        if (jsonRequest.get("keyWords").textValue() != null && !jsonRequest.get("keyWords").textValue().isEmpty())
            keyWords.addAll(Stream.of(jsonRequest.get("keyWords").textValue().split(" ")).collect(Collectors.toList()));
        if (jsonRequest.get("freeText").textValue() != null && !jsonRequest.get("freeText").textValue().isEmpty())
            keyWords.addAll(Stream.of(jsonRequest.get("freeText").textValue().split(" ")).collect(Collectors.toList()));
        if (jsonRequest.get("semanticSearch").textValue() != null && !jsonRequest.get("semanticSearch").textValue().isEmpty())
            keyWords.addAll(Stream.of(jsonRequest.get("semanticSearch").textValue().split(" ")).collect(Collectors.toList()));
        return keyWords;
    }

    public void saveSearchResult(SearchResult searchResult) {
        searchResultDAO.save(searchResult);
    }

    public CompletionStage<List<SearchResult>> getSearchResultsByUser(User user){
        return CompletableFuture.supplyAsync(() -> searchResultDAO.findByUser(user));
    }

    public void deleteSearchResultsByIds(String ids) throws MultimediaSearchServiceException {
        List<String> idsToRemove = Arrays.asList(ids.split(","));
        if (idsToRemove.size() == 0) {
            throw new MultimediaSearchServiceException("The IDs to be removed must be specified");
        } else if (idsToRemove.size() == 1) {
            if (searchResultDAO.get(idsToRemove.get(0)) != null) {
                searchResultDAO.deleteById(new ObjectId(idsToRemove.get(0)));
            } else {
                throw new MultimediaSearchServiceException("The Search Result specified doesn't exists!");
            }
        } else {
            idsToRemove.stream()
                    .forEach(id -> searchResultDAO.deleteById(new ObjectId(id)));
        }
    }
}
