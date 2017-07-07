package services.search.repositories;

import play.libs.ws.WSClient;

import java.lang.reflect.Constructor;

/**
 * Created by Pasquale on 06/07/2017.
 */
public class SearchRepositoryFactory {

    /*public SearchRepository create(String name, WSClient wsClient){
        SearchRepository searchRepo=null;
        try {
            Class c = Class.forName("services.search.repositories." + name + "SearchRepository");
            searchRepo = (SearchRepository) c.newInstance();
        }catch (ClassNotFoundException cnfe){
            cnfe.printStackTrace();
        }catch(IllegalAccessException iae){
            iae.printStackTrace();
        }catch(InstantiationException ie){
            ie.printStackTrace();
        }
        return searchRepo;
    }*/

    public SearchRepository newInstance(String abstractName, Class<?>[] paramTypes,
                              Object[] params) {
        SearchRepository obj = null;

        try {
            Class c = Class.forName("services.search.repositories." + abstractName + "SearchRepository");

            if (c == null) {
                throw new RuntimeException("No class registered under " +
                        abstractName);
            }

            Constructor<SearchRepository> ctor = c.getConstructor(paramTypes);
            obj = ctor.newInstance(params);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return obj;
    }

}
