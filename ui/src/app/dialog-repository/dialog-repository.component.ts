import { Repository } from '../_models/repository';
import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../_models/user";
import { RepositoryService, AlertService } from "../_services/index";
import { Router } from "@angular/router"


@Component({
  selector: 'app-dialog-repository',
  templateUrl: './dialog-repository.component.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryComponent implements OnInit {

repository: Repository;
repositories:Repository[];
loading:boolean = false;

  constructor(
    public dialog: MdDialog,
    private RepositoryService:RepositoryService,
    private alertService: AlertService ) {
    //this.repository=new Repository('Youtube','www.youtube.com','prefix');
   }

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

// parent component


   openDialog() {

let dialogRef = this.dialog.open(DialogRepositoryDetail, {
  
  data: {repository: this.repository},
  height: 'auto',
  width: '40%',
  position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
});

const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
  this.getAllRepositories();
  console.log('onAdd.subscribe->run');
});
dialogRef.afterClosed().subscribe(() => {
  // unsubscribe onAdd
  console.log('onAdd.UNsubscribe->run');
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
    model: any = {}
    loading:boolean = false;
    @Output() onAdd = new EventEmitter();

  constructor(
      public dialogRef: MdDialogRef<DialogRepositoryDetail>,
      @Inject(MD_DIALOG_DATA) public data: any,
      private router: Router,
      private RepositoryService:RepositoryService,
      private alertService: AlertService    ) {}
  
  
  onSubmit() {

        this.submitted = true;
        //localStorage.setItem("repository", JSON.stringify(this.repository))
        this.AddRepo();
        
}




AddRepo() {
        this.loading = true
        console.log('this.model',this.model)

        this.RepositoryService.create(this.model)
            .subscribe(
                data => {
                     
                    let repository = new Repository(this.model.name,this.model.uri,this.model.urlPrefix);
                    console.log('new repository',repository);
                    this.onAdd.emit();
                    this.dialogRef.close();  
                    
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
