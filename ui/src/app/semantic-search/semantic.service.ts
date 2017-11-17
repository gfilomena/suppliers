import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, } from "@angular/http"
import { environment } from '../../environments/environment';

@Injectable()
export class SemanticService {

  constructor(private http: Http) { }

  // set up the url annotations POST request headers and submit the API call
  searchUrlAnnotations(url: Object) {
    let headers: Headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.serviceUrl + "/annotations/url", url, this.jwt(headers))
  }

  // set up the file annotations POST request headers and submit the API call
  searchFileAnnotations(file: File) {
    let headers: Headers = new Headers;
    let formData: FormData = new FormData();
    formData.append('doc', file);
    return this.http.post(environment.serviceUrl + "/annotations/file", formData, this.jwt(headers))
  }

  // add authentication jwt headers
  private jwt(headers: Headers): RequestOptions {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (currentUser && currentUser.token) {
      headers.append("Authorization", "Bearer " + currentUser.token);
      headers.append('Accept', 'application/json');
      return new RequestOptions({ headers: headers });
    }
    return null;
  }

}
