package models.response;

import models.MultimediaContent;

import java.util.List;

/**
 * Created by Pasquale on 20/07/2017.
 */
public abstract class RepositoryResponseMapping implements  ResponseMapping{

    private List<MultimediaContent> multimediaContents;

    private String currentPage;

    private String previousPage;

    private String nextPage;

    private String cursor;

    private int nOfResults;

    public List<MultimediaContent> getMultimediaContents() {
        return multimediaContents;
    }

    public void setMultimediaContents(List<MultimediaContent> multimediaContents) {
        this.multimediaContents = multimediaContents;
    }

    public String getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }

    public String getPreviousPage() {
        return previousPage;
    }

    public void setPreviousPage(String previousPage) {
        this.previousPage = previousPage;
    }

    public String getNextPage() {
        return nextPage;
    }

    public void setNextPage(String nextPage) {
        this.nextPage = nextPage;
    }

    public String getCursor() {
        return cursor;
    }

    public void setCursor(String cursor) {
        this.cursor = cursor;
    }

    public int getnOfResults() {
        return nOfResults;
    }

    public void setnOfResults(int nOfResults) {
        this.nOfResults = nOfResults;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RepositoryResponseMapping that = (RepositoryResponseMapping) o;

        if (nOfResults != that.nOfResults) return false;
        if (multimediaContents != null ? !multimediaContents.equals(that.multimediaContents) : that.multimediaContents != null)
            return false;
        if (currentPage != null ? !currentPage.equals(that.currentPage) : that.currentPage != null) return false;
        if (previousPage != null ? !previousPage.equals(that.previousPage) : that.previousPage != null) return false;
        if (nextPage != null ? !nextPage.equals(that.nextPage) : that.nextPage != null) return false;
        return cursor != null ? cursor.equals(that.cursor) : that.cursor == null;
    }

    @Override
    public int hashCode() {
        int result = multimediaContents != null ? multimediaContents.hashCode() : 0;
        result = 31 * result + (currentPage != null ? currentPage.hashCode() : 0);
        result = 31 * result + (previousPage != null ? previousPage.hashCode() : 0);
        result = 31 * result + (nextPage != null ? nextPage.hashCode() : 0);
        result = 31 * result + (cursor != null ? cursor.hashCode() : 0);
        result = 31 * result + nOfResults;
        return result;
    }
}
