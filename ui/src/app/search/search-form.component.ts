import { SearchForm } from './../_models/search-form';
import { Bookmark } from './../_models/bookmark';
import { Component, Inject, HostListener, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { User } from "../_models/user";
import { SearchService } from "./search.service";
import { BookmarkService } from "../_services/bookmark.service";
import { MultimediaContent } from "../_models/multimediaContent";
import { MdDialog, MdDialogRef,DateAdapter, MdSnackBar } from "@angular/material";
import { DialogDetail } from "../dialog-detail/dialog-detail.component";
import { NgSwitch } from '@angular/common';
import { CustomDateAdapter } from './custom-date-adapter'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-form',
  //issue #datepicker with the format date, CustomDateAdapter customize the native DateAdapter 
  providers: [ {provide: DateAdapter, useClass: CustomDateAdapter } ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
    submitted = false;
    savestate = false;
    currentUser: User;
    types = ['Audio', 'Video', 'Text', 'Image'];
    searchForm:SearchForm;
    searchResult: MultimediaContent[];
    searchVideoResult: MultimediaContent[];
    searchImgResult: MultimediaContent[];
    searchAudioResult: MultimediaContent[];
    searchTextResult: MultimediaContent[];

    VideoResult: number = 0;
    ImageResult: number = 0;
    AudioResult: number = 0;
    TextResult: number = 0;
    
   videofilter: Boolean = true;
   audiofilter: Boolean = true;
   textfilter: Boolean = true;
   imagefilter: Boolean = true;
   
   filterbar:boolean = true;
   showSidebar: boolean = true;
   history:any;
   nOfResults:number;
   bookmarks: Bookmark[];
   minDate = new Date(2017, 0, 1);
   maxDate = new Date(2018, 0, 1);

   
    constructor(private searchService: SearchService, private route: ActivatedRoute,
                private router: Router,private BookmarkService: BookmarkService,
                private dateAdapter: DateAdapter<Date>,
                private dialog: MdDialog,
                public snackBar: MdSnackBar){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        let historyform = JSON.parse(localStorage.getItem("searchForm"))
        this.dateAdapter.setLocale('ll');

        if (localStorage["searchForm"]) {
           this.searchForm= new SearchForm('',historyform.keywords,'',historyform.inDate,historyform.endDate,'') 
           localStorage.removeItem("searchForm")
        }else{
            console.log('NEW searchForm')
            let type :string[]
            this.searchForm= new SearchForm('','','',new Date(),new Date(),'')
        }
        
    }


openDialog(mc) {
 

        let dialogRef = this.dialog.open(DialogDetail, {
        height: 'auto',
        width: '600px',
        position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
        });


        dialogRef.componentInstance.data = mc;

          const sub = dialogRef.componentInstance.mcupdate.subscribe(() => {
            console.log('const sub = dialogRef.componentInstance.mcupdate.subscribe:',mc)
     
          });
          dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
          });
}


@HostListener("window:scroll", ["$event"])
    onWindowScroll() {

         let status = "not reached";
         let windowHeight = "innerHeight" in window ? window.innerHeight
             : document.documentElement.offsetHeight;
         let body = document.body, html = document.documentElement;
         let docHeight = Math.max(body.scrollHeight,
             body.offsetHeight, html.clientHeight,
             html.scrollHeight, html.offsetHeight);
         let windowBottom = windowHeight + window.pageYOffset;
         if (windowBottom + 1 >= docHeight) {
          console.log('bottom reached');
         }
         
}


onSubmit() {

        this.submitted = true;
        console.log('this.searchForm',this.searchForm);
        localStorage.setItem("searchForm", JSON.stringify(this.searchForm));
        this.search();
        
}


search(){
        this.searchService.search(this.searchForm)
        .subscribe(
                  res => {
                      this.searchResult=res.json().multimediaContents;
                      console.log('this.searchResult: '+this.searchResult);
                      this.counter(this.searchResult)
                      //this.validator(this.searchResult)
                      this.nOfResults = this.searchResult.length;
                      console.log('this.searchResult.length;',this.searchResult.length)
                      this.submitted = false;
                  },
                  error => {
                      console.log('search - subscribe - error:',error);
                      this.submitted = false;
                  }
                )
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
                              let element = document.getElementById(mc.uri);
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



   counter(array) {
    var i:number
        for(i = 0;i<array.length;i++) { 
         var type = array[i].type
         //console.log('type::',type)
          switch(type) { 
            case 'video': { 
                //console.log('video-array[i]',array[i])
                this.VideoResult++;
                break;
            } 
            case 'audio': { 
                //console.log('audio-array[i]',array[i])
               this.AudioResult++;
               break;
            } 
            case 'image': { 
                //console.log('image-array[i]',array[i])
               this.ImageResult++;
               break;
            } 
            case 'text': { 
                //console.log('text-array[i]',array[i])
               this.TextResult++;
               break;
            } 
            default: { 
              break;
            } 
          } 

        }
    }

    filter(type:string):any{
     
          switch(type) { 
            case 'video': { 
                if (this.videofilter){
                        return true;
                }else{
                        return false
                }
            } 
            case 'audio': { 
                if (this.audiofilter){
                        return true;
                }else{
                        return false
                }
            } 
            case 'image': { 
                if (this.imagefilter){
                        return true;
                }else{
                        return false
                }
            } 
            case 'text': { 
                if (this.textfilter){
                        return true;
                }else{
                        return false
                }
            } 
            default: { 
              return true;
            } 
          } 

    }




sidebar(size:number):number {
  if(this.showSidebar){
       return 0;
  }else{
      return size;
  }
}



  getDate(date:string): string{
    return new Date(date).toString().slice(0,15);
  }

  toDate(date){
      console.log('date',date)
  }


}

