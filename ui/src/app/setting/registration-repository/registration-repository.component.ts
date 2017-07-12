import { Repository } from '../../_models/repository';
import { UserRepository } from '../../_models/user-repository';
import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../../_models/user";
import { UserRepositoryService, AlertService } from "../../_services/index";
import { Router } from "@angular/router"

@Component({
  selector: 'dialog-registration-repository',
  templateUrl: 'dialog-registration-repository.html',
  styleUrls: ['./registration-repository.component.css']
})
export class DialogRegistrationRepository {


    submitted = false;
    currentUser: User;
    
    loading:boolean = false;
    @Output() onChange = new EventEmitter();

  constructor(
      public dialogRef: MdDialogRef<DialogRegistrationRepository>,
      @Inject(MD_DIALOG_DATA) public data: any,
      private router: Router,
      private UserRepositoryService:UserRepositoryService,
      private alertService: AlertService    ) {}
  
  
  onSubmit() {
        this.submitted = true;
        //localStorage.setItem("repository", JSON.stringify(this.repository))   
}


upsert(UserRepository:UserRepository) {
      console.log('repository',UserRepository);
        this.loading = true

if(UserRepository.id) {

    this.UserRepositoryService.update(UserRepository)
            .subscribe(
                data => {
                    this.onChange.emit();
                    this.dialogRef.close();     
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })

}else{

    this.UserRepositoryService.create(UserRepository)
            .subscribe(
                data => {                 
                    console.log('new UserRepository',UserRepository);
                    this.onChange.emit();
                    this.dialogRef.close();     
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })

}

}   
      
   getDate(date:string):string{
    return new Date(date).toString().slice(0,15);
  }
}

@Component({
  selector: 'app-registration-repository',
  templateUrl: './registration-repository.component.html',
  styleUrls: ['./registration-repository.component.css']
})
export class RegistrationRepositoryComponent implements OnInit {

repository = new Repository();
UserRepositories:UserRepositories[];
loading:boolean = false;

  constructor(
    public dialog: MdDialog,
    private UserRepositoryService:UserRepositoryService,
    private alertService: AlertService ) {
    //this.repository=new Repository('Youtube','www.youtube.com','prefix');
   }

  ngOnInit() {
      this.getAllRepositories();
  }



  getAllRepositories(){
    this.UserRepositoryService.getAll()
            .subscribe(
                data => {
                  console.log('data',data);
                    this.UserRepositories = data;
                    localStorage.setItem("repositories",JSON.stringify(this.UserRepositories));
                   console.log(' this.repositories', this.UserRepositories);
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
    }




delete(id:string) {
   this.loading = true
        console.log('id:',id)

        this.UserRepositoryService.delete(id)
            .subscribe(
                data => {
                    this.getAllRepositories();
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
}

  create() {
    let repository = new Repository();
    let dialogRef = this.dialog.open(DialogRegistrationRepository, {
      data: {repository:repository},
      height: 'auto',
      width: '40%',
      position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
    });

    const sub = dialogRef.componentInstance.onChange.subscribe(() => {
      this.getAllRepositories();
      console.log('onChange.subscribe->run');
    });
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onChange
      console.log('onChange.UNsubscribe->run');
    });

  }

    update(repository:Repository) {

    let dialogRef = this.dialog.open(DialogRegistrationRepository, {
      data: {repository:repository},
      height: 'auto',
      width: '40%',
      position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
    });

    const sub = dialogRef.componentInstance.onChange.subscribe(() => {
      this.getAllRepositories();
      console.log('onChange.subscribe->run');
    });
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onChange
      console.log('onChange.UNsubscribe->run');
    });


    }

}
