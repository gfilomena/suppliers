import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/repository';
import { RepositoryService, AlertService } from "../_services/index";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

repositories:Repository[];
loading:boolean = false;


  constructor(     
      private RepositoryService:RepositoryService,
      private alertService: AlertService 
      ) { }

  ngOnInit() {
      this.getAllRepositories();
  }

  

  getAllRepositories(){
    this.RepositoryService.getAll()
            .subscribe(
                data => {
                  console.log('data',data);
                    this.repositories = data;
                    localStorage.setItem("repositories",JSON.stringify(this.repositories));
                   console.log(' this.repositories', this.repositories);
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
    }
      
  }


