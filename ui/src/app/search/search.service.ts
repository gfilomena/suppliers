import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { SearchForm }    from '../_models/search-form';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
    constructor(private http: Http) { }

    search(search: SearchForm) {
        return this.http.post(environment.serviceUrl + "/search", search, this.jwt())
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