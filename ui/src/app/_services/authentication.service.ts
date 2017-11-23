import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post(environment.serviceUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const authResult = response.json();
                if (authResult && authResult.accessToken && authResult.idToken && authResult.expiresAt) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    this.setSession(authResult);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('searchForm');
        localStorage.removeItem('lastresearch');
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('bookmarks');
        localStorage.removeItem('repositories');
    }

    private setSession(authResult): void {
        const jwtHelper: JwtHelper = new JwtHelper();
        console.log(
            jwtHelper.decodeToken(authResult.idToken));
        console.log('Set session');
        // Set the time that the access token will expire at
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', authResult.expiresAt);
        const params: string = '{ '
            + ' "username":"' + jwtHelper.decodeToken(authResult.idToken).sub + '" '
            + '}';
        const obj = JSON.parse(params);
        localStorage.setItem('currentUser', params);
    }
}
