import { Repository } from '../../_models/repository';
import { UserRepository } from '../../_models/user-repository';
import { Component, OnInit, Input, Output,EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../../_models/user";
import { UserRepositoryService, RepositoryService, AlertService } from "../../_services/index";
import { Router } from "@angular/router"
import {MatSnackBar} from '@angular/material'



@Component({
  selector: 'app-registration-repository',
  templateUrl: './registration-repository.component.html',
  styleUrls: ['./registration-repository.component.css']
})
export class RegistrationRepositoryComponent implements OnInit {

repository = new Repository();
currentUser: User;
userRepository: UserRepository;
userRepositories: UserRepository[];
loading = false;

  constructor(
    public dialog: MatDialog,
    private userRepositoryService:UserRepositoryService,
    private alertService: AlertService,
    public snackBar: MatSnackBar ) {
    // this.repository=new Repository('Youtube','www.youtube.com','prefix');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userRepository = new UserRepository();
    this.userRepository.user  = this.currentUser.username;

   }

  ngOnInit() {
      this.getUserRepositories();
  }



  getUserRepositories(){
    this.userRepositoryService.findByUser()
            .subscribe(
                data => {
                    console.log('data',data);
                    this.userRepositories = data;
                    localStorage.setItem("repositories",JSON.stringify(this.userRepositories));
                    console.log(' this.userRepositories', this.userRepositories);
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
                    this.getUserRepositories();
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
}


  create() {

    const dialogRef = this.dialog.open(DialogRegistrationRepository, {
      data: {userRepository:this.userRepository},
      height: 'auto',
      width: '315px',
    });

    const sub = dialogRef.componentInstance.onChange.subscribe(() => {
      this.getUserRepositories();
      console.log('onChange.subscribe->run');
    });
    dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onChange
      console.log('onChange.UNsubscribe->run');
    });

  }

  toggle(userRepository:UserRepository) {

 console.log('1 userRepository', userRepository)
 let enabled = !userRepository.enabled
 console.log('1 enabled', enabled)
 userRepository.enabled = enabled
 console.log('2 userRepository', userRepository)
 let name = userRepository.repository
 this.userRepositoryService.update(userRepository)
            .subscribe(
                data => {
                    console.log('respose update:',data);
                    this.openSnackBar('The Repository '+ name +' has been switch '+enabled,'OK')
                },
                error => {
                    this.alertService.error(error._body)
                    this.openSnackBar('The Repository '+ name +' has not been switched '+enabled,'OK')
                })

  }

     openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

    update(userRepository:UserRepository) {

    let dialogRef = this.dialog.open(DialogRegistrationRepository, {
      data: {userRepository:userRepository},
      height: 'auto',
      width: '400px',
      position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
    });

    const sub = dialogRef.componentInstance.onChange.subscribe(() => {
      this.getUserRepositories();
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
      public dialogRef: MatDialogRef<DialogRegistrationRepository>,
      @Inject(MAT_DIALOG_DATA) public data: any,
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

 private change(value: any) {
   console.log('Selected value is: ', value);
 }

 onClose(): void {
    this.dialogRef.close();
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
                    console.log('respose update:',data);
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

