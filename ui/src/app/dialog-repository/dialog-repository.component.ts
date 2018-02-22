import { Repository } from './../_models/repository';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../_models/user';
import { RepositoryService, AlertService } from '../_services/index';
import { Router } from '@angular/router';
import { Snackbar } from './../snackbar/snackbar.component';

@Component({
  selector: 'app-dialog-repository',
  templateUrl: './dialog-repository.component.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryComponent implements OnInit {


  repositories: Repository[];
  loading = false;


  constructor(
    public dialog: MatDialog,
    private RepositoryService: RepositoryService,
    private alertService: AlertService,
    public snackBar: Snackbar) {
    let repository = new Repository();
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
        this.snackBar.run('Listing of repositories action has encountered an error. Detail:' + error, false);
        this.loading = false;
      })
  }



  delete(rep: Repository) {
    this.loading = true;
    const dialogc = this.dialog.open(DialogConfirmationDialog, {
      data: { name: rep.name },
      height: 'auto'
    });

    dialogc.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.RepositoryService.delete(rep.id)
          .subscribe(
          data => {
            this.getAllRepositories();

            this.snackBar.run('The repository ' + rep.name + ' has been deleted!', true);

          },
          error => {
            this.snackBar.run('Delete action of the repository has encountered an error. Detail:' + error, false);
            console.log('RepositoryService.delete -> error:', error);
            this.loading = false;
          })
      }
    });
  }

  create() {
    const repository = new Repository();
    const dialogRef = this.dialog.open(DialogRepositoryDetail, {
      data: { repository: repository }
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
  selector: 'dialog-confirmation-dialog',
  templateUrl: 'dialog-confirmation-dialog.html',
})
export class DialogConfirmationDialog {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}


@Component({
  selector: 'dialog-repository-dialog',
  templateUrl: 'dialog-repository-dialog.html'
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
    private alertService: AlertService,
    public snackBar: Snackbar) { }

  onSubmit() {
    this.submitted = true;
    // localStorage.setItem('repository', JSON.stringify(this.repository))
  }

  onClose() {
    this.dialogRef.close();
  }

  upsert(repository: Repository) {
    this.loading = true;

    if (repository.id) {

      this.RepositoryService.update(repository)
        .subscribe(
        data => {
          this.snackBar.run('The repository ' + repository + ' has been updated!', true);
          this.onChange.emit();
          this.dialogRef.close();
        },
        error => {
          this.snackBar.run('Update action of the repository ' + repository + ' has encountered an error. Detail:' + error, false);
          console.log('RepositoryService.update -> error:', error);
          this.loading = false;
        })

    } else {

      this.RepositoryService.create(repository)
        .subscribe(
        data => {
          this.snackBar.run('The repository ' + repository + ' has been created!', true);
          this.onChange.emit();
          this.dialogRef.close();
        },
        error => {
          this.snackBar.run('Create action of the repository ' + repository + ' has encountered an error. Detail:' + error, false);
          console.log('RepositoryService.create -> error:', error);
          this.loading = false;
        })
    }
  }

  getDate(date: string): string {
    return new Date(date).toString().slice(0, 15);
  }

}
