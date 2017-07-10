import { Component, OnInit, Input, Inject } from '@angular/core';
import { Repository } from '../../_models/repository';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../../_models/user";
import { RepositoryService, AlertService } from "../../_services/index";
import { Router } from "@angular/router"


@Component({
  selector: 'app-dialog-repository',
   inputs: ['repository'],
  templateUrl: './dialog-repository.component.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryComponent implements OnInit {

repository: Repository;


  constructor(public dialog: MdDialog) {
    //this.repository=new Repository('Youtube','www.youtube.com','prefix');
   }

  ngOnInit() {
  }



   openDialog() {
   console.log('Repository',this.repository);
let dialogRef = this.dialog.open(DialogRepositoryDetail, {
  
  data: this.repository,
  height: 'auto',
  width: '40%',
  position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
});
   
}


 



}


@Component({
  selector: 'dialog-repository-dialog',
  templateUrl: 'dialog-repository-dialog.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryDetail {
    submitted = false;
    currentUser: User;
    repository: Repository;
    model: any = {}
    loading:boolean = false;

  constructor(
      public dialogRef: MdDialogRef<DialogRepositoryDetail>,
      @Inject(MD_DIALOG_DATA) public data: any,
      private router: Router,
      private RepositoryService:RepositoryService,
      private alertService: AlertService    ) {}
  
  
  onSubmit() {

        this.submitted = true;
        console.log(JSON.stringify(this.repository))
        //localStorage.setItem("repository", JSON.stringify(this.repository))
        this.register();
        
}

register() {
        this.loading = true
        console.log('this.model',this.model)
        this.RepositoryService.create(this.model)
            .subscribe(
                data => {
                    
                    this.alertService.success("Repository added successful", true)
                    this.dialogRef.close();
                    this.router.navigate(["/profile"])
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
    }
      
     

  
   getDate(date:string):string{
    return new Date(date).toString().slice(0,15);
  }
}
