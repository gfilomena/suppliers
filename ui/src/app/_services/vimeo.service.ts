import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class VimeoService {
    constructor(private http: Http) { }

    getToken(code: string) {
        console.log(code);
        const body = JSON.stringify(
            {
                'grant_type': 'authorization_code',
                'redirect_uri': environment.vimeo_callbackURL + 'profile',
                'code': code
            });
        console.log('body', body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(environment.vimeo_clientID + ':' + environment.vimeo_client_secret));

        // headers.append('Access-Control-Allow-Origin', '*');
        console.log('headers', headers);

        const options = new RequestOptions({ headers: headers });
        return this.http.post('https://api.vimeo.com/oauth/access_token', body, options);
    }

}