import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/index';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if (localStorage.getItem("currentUser")) {
            // logged in so return true
            return true
        }*/

        /*if(this.auth.isAuthenticated()){
            console.log('authenticated');
            return true;
        } else {
        // not logged in so redirect to login page with the return url
        console.log('not authenticated');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
        }*/
        /*if (environment.production) {
            console.log('app is in production mode');
            this.auth.handleAuthentication();
            let authenticated = false;
            if (this.auth.isAuthenticated()) {
                authenticated = true;
            } else {
                this.auth.renewToken();
            }
            return authenticated;
        }*/
        /*console.log('before handle authentication on auth guard');
        this.auth.handleAuthentication();
        console.log('after handle authentication on auth guard');*/
        if (this.auth.isAuthenticated()) {
            console.log('Auth Guard: authenticated');
            return true;
        } else {
            console.log('Auth Guard: not authenticated');
            // not logged in so redirect to login page with the return url
            if (environment.production) { // redirect to dashboard or login
                this.auth.unscheduleRenewal();
                window.location.href = environment.auth_logoutUrl;
                return false;
            } else {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        }

    }
}
