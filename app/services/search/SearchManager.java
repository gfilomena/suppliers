package services.search;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import models.SearchResult;
import models.User;
import models.response.RepositoryResponseMapping;
import models.response.ResponseMapping;
import play.libs.concurrent.Futures;
import play.libs.ws.WSClient;
import services.search.repositories.SearchRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class SearchManager implements Manager{

    private List<String> keyWords=new ArrayList<String>();
    private User user;
    private WSClient wsclient;

    public SearchManager(User user, List<String> keywords, WSClient wsClient){
        this.keyWords=keywords;
        this.user=user;
        this.wsclient=wsClient;
    }

    public List<String> getKeyWords() {
        return keyWords;
    }

    public void setKeyWords( List<String> keyWords ) {
        this.keyWords = keyWords;
    }

    public SearchResult getQueryResult(){
        return null;
    }

    @Override
    public List<CompletionStage<RepositoryResponseMapping>> dispatch(List<SearchRepository> repositories){
        List<CompletionStage<RepositoryResponseMapping>> s;
        s = repositories
                .stream()
                .map( repository  -> {
                    CompletionStage<JsonNode> jsonRes=repository.executeQuery(this.getKeyWords());
                    CompletionStage<RepositoryResponseMapping> transformed=jsonRes.thenApply(j -> repository.transform(j));
                    return transformed;
                })
                .collect(Collectors.toList());
        return s;
    }

    @Override
    public CompletionStage<List<MultimediaContent>> aggregate(List<CompletionStage<RepositoryResponseMapping>> stages){
        return Futures
                .sequence(stages)
                .thenApply(responses -> {
                    List<MultimediaContent> mulcon=new ArrayList<MultimediaContent>();
                    responses
                            .stream()
                            .forEach(mc -> mulcon.addAll(mc.getMultimediaContents()));
                    return mulcon;
                });
    }


}
