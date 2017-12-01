import { Bookmark } from './../_models/bookmark';
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { environment } from '../../environments/environment';


@Injectable()
export class BookmarkService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + '/bookmarks', this.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + '/bookmarks/' + id, this.jwt()).map((response: Response) => response.json())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + '/bookmarks/me/', this.jwt()).map((response: Response) => response.json())
    }

    create(bookmark: Bookmark) {
        return this.http.post(environment.serviceUrl + '/bookmarks', bookmark, this.jwt());
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + '/bookmarks?ids=' + id, this.jwt());
    }

    deleteAllByUser() {
        return this.http.delete(environment.serviceUrl + '/bookmarks/me/', this.jwt()).map((response: Response) => response);
    }

    // private helper methods

    private jwt() {
        const access_token = localStorage.getItem('id_token');
        if (access_token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
            return new RequestOptions({ headers: headers });
        }
        return null;
    }
}