package services.search;

import models.MultimediaContent;
import services.search.repositories.Repository;

import java.util.List;
import java.util.concurrent.CompletionStage;

/**
 * Created by Pasquale on 16/03/2017.
 */
public interface Manager {

    public List<CompletionStage<List<MultimediaContent>>> dispatch( List<Repository> repositories);

    public CompletionStage<List<MultimediaContent>> aggregate(List<CompletionStage<List<MultimediaContent>>> stages);

}
