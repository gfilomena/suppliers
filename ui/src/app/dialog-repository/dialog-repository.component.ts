import { Repository } from './../_models/repository';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../_models/user';
import { RepositoryService, AlertService } from '../_services/index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-repository',
  templateUrl: './dialog-repository.component.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryComponent implements OnInit {

  repository = new Repository();
  repositories: Repository[];
  loading = false;

  constructor(
    public dialog: MatDialog,
    private RepositoryService: RepositoryService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.getAllRepositories();
  }



  getAllRepositories() {
    this.RepositoryService.getAll()
      .subscribe(
      data => {
        console.log('data', data);
        this.repositories = data;
        localStorage.setItem('repositories', JSON.stringify(this.repositories));
        console.log(' this.repositories', this.repositories);
      },
      error => {
        this.alertService.error(error._body)
        this.loading = false;
      })
  }




  delete(id: string) {
    this.loading = true;
    console.log('id:', id)

    this.RepositoryService.delete(id)
      .subscribe(
      data => {
        this.getAllRepositories();
      },
      error => {
        this.alertService.error(error._body)
        this.loading = false;
      })
  }

  create() {
    const repository = new Repository();
    const dialogRef = this.dialog.open(DialogRepositoryDetail, {
      data: { repository: repository },
      height: 'auto',
      width: '40%',
      position: { top: '0', left: '30%', right: '30%', bottom: '0' }
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

  update(repository: Repository) {

    const dialogRef = this.dialog.open(DialogRepositoryDetail, {
      data: { repository: repository },
      height: 'auto',
      width: '40%',
      position: { top: '0', left: '30%', right: '30%', bottom: '0' }
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
  selector: 'dialog-repository-dialog',
  templateUrl: 'dialog-repository-dialog.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryDetail {
  submitted = false;
  currentUser: User;

  loading = false;
  @Output() onChange = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogRepositoryDetail>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private RepositoryService: RepositoryService,
    private alertService: AlertService) { }

  onSubmit() {
    this.submitted = true;
    // localStorage.setItem('repository', JSON.stringify(this.repository))
  }

  onClose() {
    this.dialogRef.close();
  }

  upsert(repository: Repository) {
    console.log('repository', repository);
    this.loading = true;

    if (repository.id) {

      this.RepositoryService.update(repository)
        .subscribe(
        data => {
          this.onChange.emit();
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error._body)
          this.loading = false;
        })

    } else {

      this.RepositoryService.create(repository)
        .subscribe(
        data => {
          console.log('new repository', repository);
          this.onChange.emit();
          this.dialogRef.close();
        },
        error => {
          this.alertService.error(error._body)
          this.loading = false;
        })
    }
  }

  getDate(date: string): string {
    return new Date(date).toString().slice(0, 15);
  }
}
