import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/index';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    activate = false;

    constructor(private router: Router, public auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('inside can activate');
        /*if (this.auth.isAuthenticated()) {
            console.log('authenticated');
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            console.log('not authenticated');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }*/
            this.auth.auth0.checkSession({}, (err, result) => {
                if (err) {
                  console.log('Auth Guard: session not authenticated');
                  alert('The session is inactive. Please re-login!');
                  this.auth.unscheduleRenewal();
                  // Go back to the home route
                   // redirect to dashboard or login
                    window.location.href = environment.auth_logoutUrl;
                } else {
                  console.log('Auth Guard: session already authenticated');
                  //this.auth.setSession(result);
                  this.activate = true;
                }
              });
        return this.activate;
    }
}
