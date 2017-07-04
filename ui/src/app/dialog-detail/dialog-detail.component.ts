import { Component, OnInit, Input, Inject } from '@angular/core';
import { MultimediaContent } from '../_models/multimediaContent';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';



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
  height: 'auto',
  width: '40%',
  position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
});
   
}



}


@Component({
  selector: 'dialog-detail-dialog',
  templateUrl: 'dialog-detail-dialog.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetail {
  constructor(public dialogRef: MdDialogRef<DialogDetail>,@Inject(MD_DIALOG_DATA) public data: any,public sanitizer: DomSanitizer) {}

  getVideoSource(URI:string):any {
        let youtube = "/youtube.com/"; 

      if (URI.search(youtube) == -1 ) { 
              console.log('YOUTUBE',URI);
             let link =  this.sanitizer.bypassSecurityTrustResourceUrl(URI);
        return link;
      }
      return 'https://www.youtube.com/embed/nrgMQ88jHj0';

}

   getDate(date:string):string{
    return new Date(date).toString().slice(0,15);
  }
}