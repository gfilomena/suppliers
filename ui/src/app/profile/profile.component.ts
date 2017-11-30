
import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/repository';
import { User } from '../_models/user';
import { UserService, AlertService } from "../_services/index";
import {MatSnackBar} from '@angular/material';
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

  constructor(
      private UserService: UserService,
      private alertService: AlertService,
      public snackBar: MatSnackBar
      ) { }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('currentUser'));
     console.log('this.currentUser', this.user);
     this.getUser();
  }

  getUser(){

    this.UserService.getByUsername(this.user.username)
            .subscribe(
                data => {
                    console.log('getByUsername', data);
                    this.user = data;
                    localStorage.setItem('currentUser', JSON.stringify(data));
                },
                error => {
                    this.alertService.error(error._body);
                });
  }

  update() {
    this.submitted = true;
    this.UserService.update(this.user)
            .subscribe(
                data => {
                    console.log('data', data);
                    this.openSnackBar('The User has been updated!', 'update');
                    this.submitted = false;
                },
                error => {
                    console.log('error:', error);
                    this.openSnackBar('The User has NOT been updated! ' + error, 'error');
                    this.submitted = false;
                });
    }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
   }
  }


