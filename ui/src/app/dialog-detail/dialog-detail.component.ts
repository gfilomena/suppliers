import { element } from 'protractor';
import { McssrService } from './../_services/mcssr.service';
import { MultimediaContent } from './../_models/multimediaContent';
import { Http, RequestOptionsArgs,RequestOptions, Headers  } from '@angular/http';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdChipsModule, MdSnackBar, MdProgressSpinnerModule } from "@angular/material";
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { User } from "../_models/user";
import { Bookmark } from './../_models/bookmark';
import { BookmarkService } from "../_services/bookmark.service";
import { InternetArchiveService } from "../_services/internetarchive.service";
import { mediafile, File } from './../_models/mediafile';
import * as mime from 'mime-types';



@Component({
  selector: 'dialog-detail-dialog',
  templateUrl: 'dialog-detail-dialog.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetail implements OnInit  {
  loaderror:boolean = true;
  currentUser: User;
  tagInsert:boolean = false;
  loading:boolean = false;
  title:boolean = true;
  details:mediafile = null;
  formats:File[] = null;
  path:string = "";
  formatVideo:String[]= ["ogv","ogg","avi","mp4","flv","fla","mov","mpeg","mpg","mpe","wmv","swf"];
  formatAudio:String[]=["mp3"];
  formatImage:String[]=["jpeg","jpg","png","gif"];
  formatText:String []=["text","html","pdf"];


  @Input() data: MultimediaContent;
  @Output() mcupdate = new EventEmitter<MultimediaContent>();

  constructor(
    public dialogRef: MdDialogRef<DialogDetail>,
    public sanitizer: DomSanitizer,
    public http: Http,
    private BookmarkService: BookmarkService,
    private McssrService: McssrService,
    public snackBar: MdSnackBar,
    private InternetArchiveService: InternetArchiveService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    }


    ngOnInit() {
         console.log('init mc:',this.data)
         //this.uriValidation(this.getVideoSource(this.data.downloadURI));
         if(this.data.source.name == "InternetArchive") {
            this.getInternetArchiveformat(this.data.uri)
         }
    }

    getVideoSource(URI:string):any {
        console.log("getVideoSource:",URI)
        let link =  this.sanitizer.bypassSecurityTrustResourceUrl(URI);
        console.log("link:",link)
        return link;
    }

    isDisabled() : boolean{
        return this.title;
    }

    toggle() {
        this.title = !this.title;;
    }



  getInternetArchiveformat(url:string) {
   
     // let url = "https://archive.org/download/SKODAOCTAVIA336x280/SKODAOCTAVIA336x280_files.xml";
    //let url = "https://ia801600.us.archive.org/26/items/SKODAOCTAVIA336x280/SKODAOCTAVIA336x280_files.xml";
    url = encodeURI(url)
    
    this.InternetArchiveService.getDetails(url).subscribe(
              res => {
                  this.details = res;
                  this.formats = this.filtertype(this.details);
                  this.path = this.details.server+this.details.dir+"/";
                  console.log('getInternetArchiveformat - subscribe OK:',this.details);
                  console.log("path",this.path)
              },
              error => {
                  console.log('getInternetArchiveformat - subscribe - error:',error);
              }
            )
    
  }  
  
  getExt(uri:String):String {
    //console.log("extension:", mime.extension(mime.lookup(uri)))
    return mime.extension(mime.lookup(uri))
  }

  getMB(byte:number){
      let num = byte/1048576;
      return num.toPrecision(3);
  }

filtertype(array:mediafile):File[] {
    let finals:File[] = [];
    let i:number;
     
    for ( i = 0; i < array.files.length; i++) {
       
        let extension = this.getExt(array.files[i].name);

           if(this.acceptedFormat(extension) > -1) {
              //console.log("ADD array.files[i].name",array.files[i].name)
                 finals.push(array.files[i])
            } 
        }
 console.log("finals",finals)
    return finals;
}

acceptedFormat(extension):number{

    switch (this.data.type) {
        case 'video': {
            return this.formatVideo.indexOf(extension);
        }
        case 'audio': {
            return this.formatAudio.indexOf(extension);
        }
        case 'image': {
            return this.formatImage.indexOf(extension);
        }
        case 'text': {
            return this.formatText.indexOf(extension);
        }
        default: {
            return -1;
        }
    }
}
  

  onChange(filename) {
    
    this.data.downloadUri = "https:\/\/"+this.path+filename
    console.log("onChange - this.data.downloadUri",this.data.downloadUri)
    this.data.uri = "https:\/\/"+this.path+filename
    this.data.fileExtension = mime.lookup(this.data.downloadUri)
    console.log("this.data.fileExtension",this.data.fileExtension)
    //let element:HTMLElement = document.getElementById("video");
    let video:HTMLVideoElement  = <HTMLVideoElement> document.getElementById("video");
    console.log("video",video);
    video.load();


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




  saveTag(mc:MultimediaContent, newtag:string){
      console.log('newtag', newtag)
      console.log('before-mc', mc)
      if(mc.metadata == null) {mc.metadata = [];}
      if (mc.metadata.find(x => x == newtag) == undefined && !isNullOrWhiteSpace(newtag)) {
        mc.metadata.push(newtag);
        //empty input tag
        (<HTMLInputElement>document.getElementById("newtag")).value = "";
        
      }
      //this.mcupdate.emit(mc);
  }

  removeTag(mc:MultimediaContent,tag:string) {
      let index = mc.metadata.findIndex(x => x == tag);
    if (index != -1 && !isNullOrWhiteSpace(tag)) {
        mc.metadata.splice(index,1);
      }
  }

  sendMcssr(mc:MultimediaContent) {
    this.loading = true;
    this.McssrService.create(mc)
    .subscribe(
              res => {
                  console.log('Send to Mcssr - subscribe OK:',res);
                  this.loading = false;
                  this.openSnackBar('The Multimedia Item has been sent correctly to Mcssr',"Successful!");
              },
              error => {
                  console.log('Send to Mcssr - subscribe - error:',error);
                  this.loading = false;
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
