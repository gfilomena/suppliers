package services.search;

import com.fasterxml.jackson.databind.JsonNode;
import models.MultimediaContent;
import models.SearchResult;
import play.libs.concurrent.Futures;
import services.search.repositories.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * Created by Pasquale on 15/03/2017.
 */
public class SearchManager implements Manager{

    private List<String> keyWords=new ArrayList<String>();

    public SearchManager( ){
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

    public List<CompletionStage<List<MultimediaContent>>> dispatch(List<Repository> repositories){
        List<CompletionStage<List<MultimediaContent>>> s;
        s = repositories
                .stream()
                .map( repository  -> {
                    CompletionStage<JsonNode> jsonRes=repository.executeQuery(this.getKeyWords());
                    CompletionStage<List<MultimediaContent>> transformed=jsonRes.thenApply(j -> repository.transform(j));
                    return transformed;
                })
                .collect(Collectors.toList());
        return s;
    }

    public CompletionStage<List<MultimediaContent>> aggregate(List<CompletionStage<List<MultimediaContent>>> stages){
        return Futures
                .sequence(stages)
                .thenApply(responses -> {
                    List<MultimediaContent> mulcon=new ArrayList<MultimediaContent>();
                    responses
                            .stream()
                            .forEach(mc -> mulcon.addAll(mc));
                    return mulcon;
                });
    }


}
