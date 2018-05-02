package services;

import com.mongodb.WriteResult;
import exceptions.BookmarkNotFoundException;
import models.Bookmark;
import models.MultimediaContent;
import models.User;
import models.dao.BookmarkDAO;
import models.dao.BookmarkDAOImpl;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Key;
import play.Logger;
import services.db.MongoDBService;

import java.util.List;

public class BookmarkService {

    public static BookmarkDAO bookmarkDAO=new BookmarkDAOImpl(Bookmark.class, MongoDBService.getDatastore());

    public BookmarkService(){

    }

    public Bookmark getBookmark(String id) throws BookmarkNotFoundException {
        Bookmark b= bookmarkDAO.get(id);
        if(b==null){
            String m="The Bookmark with id: "+id+" was not found";
            Logger.debug(m);
            throw new BookmarkNotFoundException(m);
        }
        return b;
    }

    public List<Bookmark> getBookmarksByUser(User user){
        return bookmarkDAO.findByUser(user);
    }

    public List<Bookmark> getAllBookmarks(){
        return bookmarkDAO.findAll();
    }

    public boolean bookmarkExists(User user, MultimediaContent mc){
        return bookmarkDAO.isPresent(user,mc);
    }

    public Key<Bookmark> save(Bookmark b) {
        return bookmarkDAO.save(b);
    }

    public WriteResult deleteById(String id){
       return bookmarkDAO.deleteById(new ObjectId(id));
    }

    public void deleteAllByUser(User user){
        bookmarkDAO.deleteAllByUser(user);
    }

}
