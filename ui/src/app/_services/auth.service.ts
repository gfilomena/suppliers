import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';
import { Observable, Observer } from 'rxjs/Rx';
import { Globals } from './../global';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid name email profile',
    prompt: 'none'
  });

  userProfile: any;
  refreshSubscription: any;
  observer: Observer<boolean>;
  ssoAuthComplete$: Observable<boolean> = new Observable(
    obs => (this.observer = obs)
  );

  constructor(public router: Router, private globals: Globals) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    console.log('Handle authentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // window.location.hash = '';
        this.setSession(authResult);
        this.getProfile(authResult);
        this.getUser();
        this.router.navigate(['/home']);
      } else if (err) {
        console.log(err);
        // alert(err);
        this.router.navigate(['/home']);
      }
    });
  }

  public isAlreadyAuthenticated(): boolean {
    let authenticated = false;
    console.log('Is already authenticated?');
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
          console.log('Auth Guard: session not authenticated');
          alert('The session is inactive. Please re-login!');
          this.unscheduleRenewal();
          // Go back to the home route
          // redirect to dashboard or login
          window.location.href = environment.auth_logoutUrl;
          authenticated = false;
      } else {
          console.log('Auth Guard: session already authenticated');
          //this.auth.setSession(result);
          authenticated = true;
      }
  });
  return authenticated;
  }

  private getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this.setProfile(profile);
    });
  }

  public setSession(authResult): void {
    console.log('Set session');
    const jwtHelper: JwtHelper = new JwtHelper();
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    const params: string = '{ '
      + ' "username":"' + jwtHelper.decodeToken(authResult.idToken).sub + '" '
      // + ' "roles":"' + authResult.roles + '" '
      + '}';
    const obj = JSON.parse(params);
    localStorage.setItem('currentUser', params);
    this.scheduleRenewal();
  }

  private setProfile(profile) {
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
    localStorage.removeItem('bookmarksIds');

    this.unscheduleRenewal();
    this.observer.next(false);
    // Go back to the home route
    this.auth0.logout({
      returnTo: environment.auth_logoutUrl,
      clientID: AUTH_CONFIG.clientID
    });
  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log('The session is inactive, please re-login!');
        alert('The session is inactive, please re-login!');
        this.unscheduleRenewal();
        this.observer.next(false);
        // Go back to the home route
        if (environment.production) { // redirect to dashboard or login
          window.location.href = environment.auth_logoutUrl;
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        // alert('Renew Token: Successfully renewed auth!');
        console.log('Renew Token: Successfully renewed auth!');
        this.setSession(result);
        this.getProfile(result);
        this.observer.next(true);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    //console.log('Into is Authenticated method');
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
  }

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
    // this.globals.roles = user.roles;
  }

}
