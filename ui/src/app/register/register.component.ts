import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AlertService, UserService } from "../_services/index"
import { MatSnackBar } from '@angular/material';
import { Validators } from '@angular/forms'; 
import { Snackbar } from './../snackbar/snackbar.component';

@Component({
    templateUrl: "./register.component.html",
     styles: ['.card { width:250px; } .spinner{height:36px;width:36px;} ']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        public snackBar: Snackbar) { }

    register() {
        this.loading = true
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.snackBar.run('The Registration has been executed correctly!', true);
                    this.router.navigate(["/login"]);
                },
                error => {
                    this.snackBar.run('The Registration has NOT been executed correctly!', false);
                    this.loading = false;
                })
    }

}
