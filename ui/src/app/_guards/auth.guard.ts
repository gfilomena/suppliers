import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/index';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    isAuthenticated: boolean = true;

    constructor(private router: Router, public auth: AuthService) {

        auth.ssoAuthComplete$.subscribe(
            status => this.isAuthenticated = status
          );
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('inside can activate');

        this.auth.renewToken();
        return this.isAuthenticated;
        /*if (this.auth.isAuthenticated()) {
            console.log('authenticated');
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            console.log('not authenticated');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }*/
        /*this.auth.auth0.checkSession({}, (err, result) => {
            if (err) {
                console.log('Auth Guard: session not authenticated');
                alert('The session is inactive. Please re-login!');
                this.auth.unscheduleRenewal();
                // Go back to the home route
                // redirect to dashboard or login
                window.location.href = environment.auth_logoutUrl;
                return false;
            } else {
                console.log('Auth Guard: session already authenticated');
                //this.auth.setSession(result);
                return true;
            }
        });
        console.log('Observable');*/
       // return this.auth.isAlreadyAuthenticated();
    }
}
