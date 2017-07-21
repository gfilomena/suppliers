import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AlertService, UserService } from "../_services/index"
import { MdSnackBar } from '@angular/material';
import { Validators } from '@angular/forms';
@Component({
    templateUrl: "./register.component.html",
     styles: ['.card { width:250px; }']
})

export class RegisterComponent {
    model: any = {}
    loading = false

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        public snackBar: MdSnackBar ) { }

    register() {
        this.loading = true
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.openSnackBar('The Registration has been executed correctly!','OK')
                    this.router.navigate(["/login"])
                },
                error => {
                    console.log('error',error)
                    this.openSnackBar('The Registration has NOT been executed correctly!','error')
                    this.loading = false
                })
    }

       openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
