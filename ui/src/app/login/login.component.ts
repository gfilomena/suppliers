import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { AlertService, AuthenticationService, AuthService } from "../_services/index"
import { MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {}
    loading = false
    returnUrl: string
    loginFormEnabled=false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public auth: AuthService,
        private alertService: AlertService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // this.auth.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.snackBar.open('The login has encountered an error. Detail:' + error, 'Error', {
                        duration: 5000,
                        extraClasses: ['errorSnackBar']
                     });
                    this.loading = false;
                });
    }

    loginSSO() {
        this.loading = true;
        this.auth.login();
    }

    showForm(){
        this.loginFormEnabled = true;
    }

}
