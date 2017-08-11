
import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/repository';
import { User } from '../_models/user';
import { UserService, AlertService } from "../_services/index";
import {MdSnackBar} from '@angular/material';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


submitted:boolean = false;
user;

  constructor(     
      private UserService: UserService,
      private alertService: AlertService,
      public snackBar: MdSnackBar
      ) { }

  ngOnInit() {
     this.user = JSON.parse(localStorage.getItem("currentUser"));
     console.log('this.currentUser', this.user);
     this.user.id = this.user._id;
  }

  

  update(){
    this.submitted = true
    this.UserService.update(this.user)
            .subscribe(
                data => {
                    console.log('data',data);
                    localStorage.setItem("currentUser",JSON.stringify(this.user));
                    this.openSnackBar('The User has been updated!','update')
                    this.submitted = false
                    
                },
                error => {
                    this.alertService.error(error._body)
                    this.openSnackBar('The User has not been updated correctly!','error')
                    this.submitted = false
                })
    }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
            
      
  }


