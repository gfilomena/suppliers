import { McssrService } from './../_services/mcssr.service';
import { MultimediaContent } from './../_models/multimediaContent';
import { Http, RequestOptionsArgs,RequestOptions, Headers  } from '@angular/http';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdChipsModule, MdSnackBar } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../_models/user";
import { Bookmark } from './../_models/bookmark';
import { BookmarkService } from "../_services/bookmark.service";

@Component({
  selector: 'dialog-detail-dialog',
  templateUrl: 'dialog-detail-dialog.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetail implements OnInit  {
  loaderror:boolean = true;
  currentUser: User;
  tagInsert:boolean = false;
 

  @Input() data: MultimediaContent;
  @Output() mcupdate = new EventEmitter<MultimediaContent>();

  constructor(
    public dialogRef: MdDialogRef<DialogDetail>,
    public sanitizer: DomSanitizer,
    public http: Http,
    private BookmarkService: BookmarkService,
    private McssrService: McssrService,
    public snackBar: MdSnackBar) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    }


    ngOnInit() {
         console.log('init mc:',this.data)
         //this.uriValidation(this.getVideoSource(this.data.downloadURI));
    }

    getVideoSource(URI:string):any {
        let link =  this.sanitizer.bypassSecurityTrustResourceUrl(URI);
        return link;
    }

  checkSaveBookmark(mc:MultimediaContent) {
            let bookmarks : Bookmark[];
            let exist: boolean = false;
            let responses$ =  this.BookmarkService.findByUser().subscribe(
                res => {
                    console.log('getBookmarks- subscribe - ok:',res);
                    bookmarks = res;  
                    for(let item of res) {
                        
                        if (mc.uri == item.multimediaContent.uri) {
                            console.log('mc:',mc.uri)
                            console.log('item:',item.multimediaContent.uri)
                            exist = true;
                        }
                    }
                    if(!exist) {
                        this.saveMC(mc);
                    }else{
                      this.openSnackBar('The Bookmark was already saved',"error");
                  }
                },
                error => {
                    console.log('getBookmarks - subscribe - error:',error);
                }
            )
        }

  saveMC(mc:MultimediaContent){
    let bookmark = new Bookmark(this.currentUser.username,mc);
    console.log('bookmark:',bookmark);
   
    this.BookmarkService.create(bookmark)
           .subscribe(
                     res => {
                         console.log('saveMC - subscribe OK:',res);
                         let element = document.getElementById("("+mc.uri+")");
                         console.log('element ',element);
                         element.innerText = "star"
                     },
                     error => {
                         console.log('saveMC - subscribe - error:',error);
                     }
                   )
   } 

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
/*
  saveTag(mc:MultimediaContent, newtag:string){
    console.log('newtag', newtag)
    console.log('before-mc', mc)
    newtag = newtag.trim();
    if(mc.metadata == null) {mc.metadata = "";}

    let re = "/"+newtag+"/gi"; 

    if (mc.metadata.search(re) == -1 ) { 
    
        mc.metadata =+ ","+newtag;
    }
    //this.mcupdate.emit(mc);
}
*/


  saveTag(mc:MultimediaContent, newtag:string){
      console.log('newtag', newtag)
      console.log('before-mc', mc)
      if(mc.metadata == null) {mc.metadata = [];}
      if (mc.metadata.find(x => x == newtag) == undefined && !isNullOrWhiteSpace(newtag)) {
        mc.metadata.push(newtag)
      }
      //this.mcupdate.emit(mc);
  }

  removeTag(mc:MultimediaContent,tag:string) {
      let index = mc.metadata.findIndex(x => x == tag);
    if (index != -1 && !isNullOrWhiteSpace(tag)) {
        mc.metadata.splice(index);
      }
  }

  sendMcssr(mc:MultimediaContent) {

    this.McssrService.create(mc)
    .subscribe(
              res => {
                  console.log('Send to Mcssr - subscribe OK:',res);
                  this.openSnackBar('The Multimedia Item has been sent correctly to Mcssr',"Successful!");
              },
              error => {
                  console.log('Send to Mcssr - subscribe - error:',error);
                  this.openSnackBar('The Multimedia Item hasn\'t been sent to Mcssr',"error!");
              }
            )
    
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

function isNullOrWhiteSpace(str){
    return str == null || str.replace(/\s/g, '').length < 1;
}