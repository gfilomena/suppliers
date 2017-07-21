import { Bookmark } from './../_models/bookmark';
import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { environment } from '../../environments/environment';


@Injectable()
export class BookmarkService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get(environment.serviceUrl + "/bookmark", this.jwt()).map((response: Response) => response.json())
    }

    get(id: string) {
        return this.http.get(environment.serviceUrl + "/bookmark/" + id, this.jwt()).map((response: Response) => response.json())
    }

    findByUser() {
        return this.http.get(environment.serviceUrl + "/bookmark/me/", this.jwt()).map((response: Response) => response.json())
    }

    create(bookmark: Bookmark) {
        return this.http.post(environment.serviceUrl + "/bookmark", bookmark, this.jwt())
    }

    delete(id: string) {
        return this.http.delete(environment.serviceUrl + "/bookmark/" + id, this.jwt())
    }

    deleteAllByUser() {
        return this.http.delete(environment.serviceUrl + "/bookmark/me/", this.jwt()).map((response: Response) => response)
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (currentUser && currentUser.token) {
            let headers = new Headers({ "Authorization": "Bearer " + currentUser.token })
            return new RequestOptions({ headers: headers })
        }
        return null
    }
}