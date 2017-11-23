package models.response;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OCDResponseMapping implements ResponseMapping {

    private UUID searchId;

    private List<RepositoryResponseMapping> repositoriesResponses;

    public OCDResponseMapping(){
        searchId=UUID.randomUUID();
        repositoriesResponses=new ArrayList<>();
    }

    public List<RepositoryResponseMapping> getRepositoriesResponses() {
        return repositoriesResponses;
    }

    public void setRepositoriesResponses(List<RepositoryResponseMapping> repositoriesResponses) {
        this.repositoriesResponses = repositoriesResponses;
    }
}
