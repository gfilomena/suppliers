import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/index';


@Injectable()
export class HistorysearchService {
    
    constructor(private http: Http, private auth: AuthService) { }

    

    getSearchResults(username:string) {
        return this.http.get(environment.serviceUrl + "/user/" + username + "/results",  this.auth.jwt()).map((response: Response) => response.json())
    }

    deleteAll(username:string) {
        return this.http.delete(environment.serviceUrl + "/user/" + username + "/results",  this.auth.jwt()).map((response: Response) => response)
    }
}