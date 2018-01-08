
import { Repository } from '../../../_models/repository';
import { UserRepository } from '../../../_models/user-repository';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../../../_models/user';
import { UserRepositoryService, RepositoryService, AlertService, VimeoService } from '../../../_services/index';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from "@angular/router";




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
        private userRepositoryService: UserRepositoryService,
        private alertService: AlertService,
        public snackBar: MatSnackBar) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userRepository = new UserRepository();
        this.userRepository.user = this.currentUser.username;

    }

    ngOnInit() {
        this.getUserRepositories();
    }

    getUserRepositories() {
        this.userRepositoryService.findByUser()
            .subscribe(
            data => {
                console.log('data', data);
                this.userRepositories = data;
                localStorage.setItem('repositories', JSON.stringify(this.userRepositories));
                console.log(' this.userRepositories', this.userRepositories);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            })
    }

    



    delete(reg: UserRepository) {
        this.loading = true;
        const dialogc = this.dialog.open(DialogRegistrationDialog, {
            data: { name: reg.repository },
            height: 'auto'
        });

        dialogc.afterClosed().subscribe(confirm => {
            console.log("confirm", confirm);
            if (confirm) {
                this.userRepositoryService.delete(reg.id)
                    .subscribe(
                    data => {
                        this.getUserRepositories();
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                    })
             }  
        })

    }

    create() {

        let dialogRef = this.dialog.open(DialogRegistrationRepository, {
            data: { userRepository: this.userRepository },
            height: 'auto',
            width: '400px',
        });

        const sub = dialogRef.componentInstance.onChange.subscribe(() => {
            this.getUserRepositories();
        });
        dialogRef.afterClosed().subscribe(() => {
            // unsubscribe onChange
            this.userRepository = new UserRepository();
            this.userRepository.user = this.currentUser.username;
        });

    }

    toggle(userRepository: UserRepository) {

        const enabled = !userRepository.enabled;
        userRepository.enabled = enabled;
        const name = userRepository.repository;
        this.userRepositoryService.update(userRepository)
            .subscribe(
            data => {
                console.log('respose update:', data);
                this.openSnackBar('The Repository ' + name + ' has been switched to ' + enabled, 'OK');
            },
            error => {
                this.alertService.error(error._body);
                this.openSnackBar('The Repository ' + name + ' has not been switched to ' + enabled, 'OK');
            });

    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    update(userRepository: UserRepository) {

        const dialogRef = this.dialog.open(DialogRegistrationRepository, {
            data: { userRepository: userRepository },
            height: 'auto',
            width: '400px'
        });

        const sub = dialogRef.componentInstance.onChange.subscribe(() => {
            this.getUserRepositories();
            console.log('onChange.subscribe->run');
        });


        dialogRef.afterClosed().subscribe(() => {
            // unsubscribe onChange
            console.log('onChange.UNsubscribe->run');
            this.userRepository = new UserRepository();
            this.userRepository.user = this.currentUser.username;
        });
    }

}

@Component({
    selector: 'dialog-confirmation-dialog',
    templateUrl: 'dialog-confirmation-dialog.html',
})
export class DialogRegistrationDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}


@Component({
    selector: 'dialog-registration-repository',
    templateUrl: 'dialog-registration-repository.html',
    styleUrls: ['./registration-repository.component.css']
})
export class DialogRegistrationRepository implements OnInit {


    submitted = false;
    currentUser: User;
    repositories: Repository[];
    loading = false;
    @Output() onChange = new EventEmitter();

    

    constructor(
        public dialogRef: MatDialogRef<DialogRegistrationRepository>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private userRepositoryService: UserRepositoryService,
        private RepositoryService: RepositoryService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        public vimeodialog: MatDialog) { }

    ngOnInit() {
        this.getAllRepositories();
    }



    getAllRepositories() {
        this.RepositoryService.getAll()
            .subscribe(
            data => {
                this.repositories = data;
                localStorage.setItem('repositories', JSON.stringify(this.repositories));
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
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


    upsert(userRepository: UserRepository) {
        this.loading = true;

        if (userRepository.id) {

            this.userRepositoryService.update(userRepository)
                .subscribe(
                data => {
                    console.log('respose update:', data);
                    this.onChange.emit();
                    this.dialogRef.close();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

        } else {

            this.userRepositoryService.create(userRepository)
                .subscribe(
                data => {
                    this.onChange.emit();
                    this.dialogRef.close();
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });

        }
    }


    getTokenVimeo(userRepository: UserRepository) {

               const url = "https://api.vimeo.com/oauth/authorize?client_id=175fc3ce932c67890f60588b6377fbe91ca49e47&response_type=token&redirect_uri= http://localhost:4200/profile&state=123";

               const urlvalue = this.route.fragment['value'];
               const params = new URLSearchParams(urlvalue);
               if(params.get('access_token'))  {
                console.log('params[access_token]', params.get('access_token'));
                const access_token = params.get('access_token');
                this.data.userRepository.token = access_token;
               } else{
                window.location.href = url;
               }
          }
        

    getDate(date: string): string {
        return new Date(date).toString().slice(0, 15);
    }
}

