import { Component, OnInit, Input, Inject } from '@angular/core';
import { Repository } from '../../_models/repository';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-dialog-repository',
   inputs: ['Repository'],
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


/* 
    addRepository() {
        this.loading = true
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success("Repository added successfully", true)
                    this.router.navigate(["/profile"])
                },
                error => {
                    this.alertService.error(error._body)
                    this.loading = false
                })
                
    }
*/


}


@Component({
  selector: 'dialog-repository-dialog',
  templateUrl: 'dialog-repository-dialog.html',
  styleUrls: ['./dialog-repository.component.css']
})
export class DialogRepositoryDetail {
  constructor(public dialogRef: MdDialogRef<DialogRepositoryDetail>,@Inject(MD_DIALOG_DATA) public data: any) {}
   getDate(date:string):string{
    return new Date(date).toString().slice(0,15);
  }
}
