import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"

import { AppConfig } from "../app.config"
import { SearchForm }    from '../_models/search-form';

@Injectable()
export class SearchService {
    constructor(private http: Http, private config: AppConfig) { }

    search(search: SearchForm) {
        return this.http.post(this.config.apiUrl + "/search", search, this.jwt())
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