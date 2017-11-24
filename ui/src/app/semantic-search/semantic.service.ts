import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SemanticService {

  constructor(private http: Http) { }

  // set up the url annotations POST request headers and submit the API call
  searchUrlAnnotations(url: Object) {
    let headers: Headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.serviceUrl + '/annotations/url', url, this.jwt());
  }

  // set up the file annotations POST request headers and submit the API call
  searchFileAnnotations(file: File) {
    let headers: Headers = new Headers;
    let formData: FormData = new FormData();
    formData.append('doc', file);
    return this.http.post(environment.serviceUrl + '/annotations/file', formData, this.jwt());
  }

  // add authentication jwt headers
  private jwt() {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
        return new RequestOptions({ headers: headers });
    }
    return null;
}

}
