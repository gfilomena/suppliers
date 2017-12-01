import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class HistorysearchService {

    constructor(private http: Http) { }

    getSearchResults(username:string) {
        return this.http.get(environment.serviceUrl + '/users/' + username + '/results',  this.jwt()).map((response: Response) => response.json());
    }

    delete(username: string, id: string) {
        return this.http.delete(environment.serviceUrl + '/users/' + username + '/results?ids=' + id,  this.jwt()).map((response: Response) => response);
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