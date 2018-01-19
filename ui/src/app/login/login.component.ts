import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import { AlertService, AuthenticationService, AuthService } from "../_services/index"
import { Globals } from './../global';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {}
    loading = false
    returnUrl: string
    errorMsg = '';
    loginFormEnabled=false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public auth: AuthService,
        private alertService: AlertService,
        private globals: Globals) { }

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
                    this.getUser();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                    this.errorMsg = 'Failed to login';
                });
    }

    loginSSO() {
        this.loading = true;
        this.auth.login();
    }

    showForm(){
        this.loginFormEnabled = true;
    }

    getUser() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.globals.user = user.username;
    }
}
