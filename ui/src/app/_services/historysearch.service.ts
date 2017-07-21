import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, Response } from "@angular/http"
import { environment } from '../../environments/environment';


@Injectable()
export class HistorysearchService {
    
    constructor(private http: Http) { }

    

    getSearchResults(username:string) {
        return this.http.get(environment.serviceUrl + "/user/" + username + "/results",  this.jwt()).map((response: Response) => response.json())
    }

    deleteAll(username:string) {
        return this.http.delete(environment.serviceUrl + "/user/" + username + "/results",  this.jwt()).map((response: Response) => response)
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