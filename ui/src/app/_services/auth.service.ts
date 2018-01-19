import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http'
import * as auth0 from 'auth0-js';
import {JwtHelper} from 'angular2-jwt';
import { Globals } from './../global';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid name email'
  });

  userProfile: any;

  constructor(public router: Router, private globals: Globals) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log('Handle authentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile(authResult);
        this.getUser();
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this.setProfile(profile);
    });
  }

  private setSession(authResult): void {
    console.log('Set session');
    const jwtHelper: JwtHelper = new JwtHelper();
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    const params: string = '{ '
    + ' "username":"' + jwtHelper.decodeToken(authResult.idToken).sub + '" '
    //+ ' "roles":"' + authResult.roles + '" '
    + '}';
    const obj = JSON.parse(params);
    localStorage.setItem('currentUser', params );
  }

  private setProfile(profile){
    console.log('Set profile');
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    localStorage.removeItem('searchForm');
    localStorage.removeItem('lastresearch');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('bookmarks');
    localStorage.removeItem('repositories');
    // Go back to the home route
    // this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // private helper methods

  public jwt() {
    // create authorization header with jwt token
    const access_token = localStorage.getItem('id_token');
    if (access_token) {
        const headers = new Headers({ 'Authorization': 'Bearer ' + access_token });
        return new RequestOptions({ headers: headers });
    }
    return null;
}

getUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  this.globals.user = user.username;
  //this.globals.roles = user.roles;
}

}
