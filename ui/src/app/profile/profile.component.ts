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
    user: any;
    profile: any;
    loading = false;


    constructor(
        private UserService: UserService,
        private alertService: AlertService,
        public snackBar: MatSnackBar
    ) { }



    ngOnInit() {
        this.loading = true;
       // this.user = JSON.parse(localStorage.getItem('currentUser'));
        //console.log('this.route.url',this.router.url);
        this.profile = JSON.parse(localStorage.getItem('auth0_profile'));
        this.user = JSON.parse(this.profile['https://producer.eu/user_metadata'].user);
        console.log('this.user', this.user);
        console.log('this.profile', this.profile);
        //this.getUser();
    }

 getPicture() {

    if(this.profile && this.profile.picture) {
        return this.profile.picture;
    }else{
        return "/assets/images/account.png";
    }

  }

/*
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
*/

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