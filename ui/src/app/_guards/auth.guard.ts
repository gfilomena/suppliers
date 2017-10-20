import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public auth:AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('inside can activate');
        /*if (localStorage.getItem("currentUser")) {
            // logged in so return true
            return true
        }*/
        if(this.auth.isAuthenticated()){
            console.log('authenticated');
            return true;
        } else {
        // not logged in so redirect to login page with the return url
        console.log('not authenticated');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
        }
    }
}
