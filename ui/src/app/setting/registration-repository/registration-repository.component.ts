import { Repository } from '../../_models/repository';
import { UserRepository } from '../../_models/user-repository';
import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../../_models/user";
import { UserRepositoryService, RepositoryService, AlertService } from "../../_services/index";
import { Router } from "@angular/router"



@Component({
  selector: 'app-registration-repository',
  templateUrl: './registration-repository.component.html',
  styleUrls: ['./registration-repository.component.css']
})
export class RegistrationRepositoryComponent implements OnInit {

repository = new Repository();
currentUser:User;
userRepository:UserRepository;
userRepositories:UserRepository[];
loading:boolean = false;


  constructor(
    public dialog: MdDialog,
    private userRepositoryService:UserRepositoryService,
    private alertService: AlertService) {
    //this.repository=new Repository('Youtube','www.youtube.com','prefix');
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userRepository = new UserRepository();
    this.userRepository.user  = this.currentUser.username;
   }

  ngOnInit() {
      this.getAllRepositories();
  }



  getAllRepositories(){
    this.userRepositoryService.getAll()
            .subscribe(
                data => {
                    console.log('data',data);
                    this.userRepositories = data;
                    localStorage.setItem("repositories",JSON.stringify(this.userRepositories));
                    console.log(' this.repositories', this.userRepositories);
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
    }




delete(id:string) {
   this.loading = true
        console.log('id:',id)

        this.userRepositoryService.delete(id)
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
    
    let dialogRef = this.dialog.open(DialogRegistrationRepository, {
      data: {userRepository:this.userRepository},
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




@Component({
  selector: 'dialog-registration-repository',
  templateUrl: 'dialog-registration-repository.html',
  styleUrls: ['./registration-repository.component.css']
})
export class DialogRegistrationRepository {


    submitted = false;
    currentUser: User;
    repositories:Repository[];
    loading:boolean = false;
    @Output() onChange = new EventEmitter();

  constructor(
      public dialogRef: MdDialogRef<DialogRegistrationRepository>,
      @Inject(MD_DIALOG_DATA) public data: any,
      private router: Router,
      private userRepositoryService:UserRepositoryService,
      private RepositoryService:RepositoryService,
      private alertService: AlertService    ) {}
  
  
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


  onSubmit() {
        this.submitted = true;
        //localStorage.setItem("repository", JSON.stringify(this.repository))   
}


upsert(userRepository:UserRepository) {
      console.log('UserRepository::',userRepository);
        this.loading = true

if(userRepository.id) {

    this.userRepositoryService.update(userRepository)
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

    this.userRepositoryService.create(userRepository)
            .subscribe(
                data => {                 
                    console.log('new UserRepository',userRepository);
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

