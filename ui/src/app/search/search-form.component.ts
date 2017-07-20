import { SearchForm } from './../_models/search-form';
import { Bookmark } from './../_models/bookmark';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { User } from "../_models/user";
import { SearchService } from "./search.service";
import { BookmarkService } from "../_services/bookmark.service";
import { MultimediaContent } from "../_models/multimediaContent";
import { MdDialog, MdDialogRef } from "@angular/material";
import { DialogDetailComponent } from "../dialog-detail/dialog-detail.component";
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-search-form',
  providers: [SearchService],
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

    constructor(private searchService: SearchService, private route: ActivatedRoute,
                private router: Router,private BookmarkService: BookmarkService){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        let historyform = JSON.parse(localStorage.getItem("searchForm"))

        if (localStorage["searchForm"]) {
           this.searchForm= new SearchForm('',historyform.keywords,'',historyform.inDate,historyform.endDate,'') 
           localStorage.removeItem("searchForm")
        }else{
            console.log('NEW searchForm')
            let type :string[]
            this.searchForm= new SearchForm('','','',new Date(),new Date(),'')
        }
        
    }

    ngOnInit() {
        /*
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let result = params['history']
        this.searchForm.freeText = result.keywords;
        console.log('result',result)
      });*/
  }




  ngOnDestroy() {
   // this.sub.unsubscribe();
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


}

