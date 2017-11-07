import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, } from "@angular/http"
import { environment } from '../../environments/environment';

@Injectable()
export class SemanticService {

  constructor(private http: Http) { }

  searchUrlAnnotations(url: object) {
    return this.http.post(environment.serviceUrl + "/annotations/url", url, this.jwt())
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser && currentUser.token) {
      let headers = new Headers;
      headers.append("Authorization", "Bearer " + currentUser.token);
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return new RequestOptions({ headers: headers });
    }
    return null;
  }
}
