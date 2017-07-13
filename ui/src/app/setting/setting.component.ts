import { Component, OnInit } from '@angular/core';
import { RepositoryService, AlertService, UserRepositoryService } from "../_services/index";
import { UserRepository } from './../_models/user-repository';
import {  } from "../../_services/index";
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  userRepositories:UserRepository[];
  constructor(
    private userRepositoryService:UserRepositoryService,
    private alertService: AlertService) { }

ngOnInit() {
      this.getAllRepositories();
  }



  getAllRepositories(){
    this.userRepositoryService.getAll()
            .subscribe(
                data => {
                    this.userRepositories = data;
                    localStorage.setItem("userRepositories",JSON.stringify(this.userRepositories));
                    console.log(' this.userRepositories', this.userRepositories);
                },
                error => {
                    this.alertService.error(error._body)
                })
    }

}
