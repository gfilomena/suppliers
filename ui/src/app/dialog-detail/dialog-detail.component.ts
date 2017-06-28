import { Component, OnInit, Input, Inject } from '@angular/core';
import { MultimediaContent } from '../_models/multimediaContent';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dialog-detail',
  inputs: ['multimediaContent'],
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  multimediaContent: MultimediaContent;
  modalId: string;

  constructor(public dialog: MdDialog,public sanitizer: DomSanitizer) { }

   


 
  ngOnInit() {
    console.log('Modal ID: '+this.modalId);
  }

 openDialog() {
   console.log('this.multimediaContent',this.multimediaContent);
let dialogRef = this.dialog.open(DialogDetail, {
  
  data: this.multimediaContent,
  height: '50%',
  width: 'auto',
});
   
      }

}


@Component({
  selector: 'dialog-detail-dialog',
  templateUrl: 'dialog-detail-dialog.html',
})
export class DialogDetail {
  constructor(public dialogRef: MdDialogRef<DialogDetail>,@Inject(MD_DIALOG_DATA) public data: any) {}
}