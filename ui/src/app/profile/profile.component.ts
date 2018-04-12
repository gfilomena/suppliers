import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/repository';
import { User } from '../_models/user';
import { UserService, AlertService } from '../_services/index';
import { MatSnackBar } from '@angular/material';
import { Validators } from '@angular/forms';



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    panelOpenState = false;
    submitted = false;
    user;
    loading = false;


    constructor(
        private UserService: UserService,
        private alertService: AlertService,
        public snackBar: MatSnackBar
    ) { }



    ngOnInit() {
        this.loading = true;
        //console.log('this.route.url',this.router.url);
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        console.log('this.currentUser', this.user);
        this.getUser();
    }


    getUser() {

        this.UserService.getByUsername(this.user.username)
            .subscribe(
                data => {
                    console.log('getByUsername', data);
                    this.user = data;
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                    this.openSnackBar('Getting User action has encountered an error. Detail:' + error, 'Error', false);
                });
    }

    update() {
        this.submitted = true;
        this.UserService.update(this.user)
            .subscribe(
                data => {
                    console.log('data', data);
                    this.openSnackBar('The User has been updated.', 'Succesfull', true);
                    this.submitted = false;
                },
                error => {
                    console.log('error:', error);
                    this.openSnackBar('Update User action has encountered an error. Detail:' + error, 'Error', false);
                    this.submitted = false;
                });
    }

    openSnackBar(message: string, action: string, status: boolean) {
        let cssclasses;
        if (status) {
            cssclasses = 'success-snackbar';
        }else {
            cssclasses = 'errorSnackBar';
        }
        console.log('cssclasses',cssclasses);

        this.snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'bottom',
            extraClasses: [cssclasses]
        });

}


}