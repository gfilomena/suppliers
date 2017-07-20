import { Http, RequestOptionsArgs,RequestOptions, Headers  } from '@angular/http';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MultimediaContent } from '../_models/multimediaContent';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdChipsModule } from "@angular/material";
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
   // console.log('Modal ID: '+this.modalId);
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
export class DialogDetail implements OnInit  {
  loaderror:boolean = true;

  constructor(public dialogRef: MdDialogRef<DialogDetail>,@Inject(MD_DIALOG_DATA) public data: any,public sanitizer: DomSanitizer,public http: Http) {}


    ngOnInit() {
         console.log('init',this.data.downloadURI)
         //this.uriValidation(this.getVideoSource(this.data.downloadURI));
   }

  getVideoSource(URI:string):any {

        let link =  this.sanitizer.bypassSecurityTrustResourceUrl(URI);
        return link;
  }

 uriValidation(uri: string)
  {
   // Tried adding headers with no luck
        const header = new Headers();
        header.append('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        header.append('Access-Control-Allow-Methods', 'GET');
        header.append('Access-Control-Allow-Methods', 'OPTION');
        header.append('Access-Control-Allow-Origin', '*');
        let options: RequestOptionsArgs = {
            headers: header
        };

    console.log('uriValidation',uri);

    this.http.options(uri,options).map( result => {
           let data = result.json();
           let location = result.headers.get('Location');               
           console.log('data:',data);
           return data;
               }).subscribe(
                data => {
                  console.log('data',data);
                   this.loaderror = true
                },
                error => {
                  console.log('err',error);
                   this.loaderror = false
                    
                })
  }

  




   getDate(date:string):string{
    return new Date(date).toString().slice(0,15);
  }
}