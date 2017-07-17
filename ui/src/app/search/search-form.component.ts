import { Bookmark } from './../_models/bookmark';
import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { SearchForm }    from '../_models/search-form';
import { User } from "../_models/user";
import { SearchService } from "./search.service";
import { BookmarkService } from "../_services/bookmark.service";
import { MultimediaContent } from "../_models/multimediaContent";
import { MdDialog, MdDialogRef } from "@angular/material";
import { DialogDetailComponent } from "./dialog-detail/dialog-detail.component";
import { NgSwitch } from '@angular/common';

@Component({
  selector: 'app-search-form',
  providers: [SearchService],
  inputs: ['keywords'],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
    submitted = false;
    savestate = false;
    currentUser: User;
    types = ['Audio', 'Video', 'Text', 'Image'];
    searchForm: SearchForm;
    searchResult: MultimediaContent[];
    searchVideoResult: MultimediaContent[];
    searchImgResult: MultimediaContent[];
    searchAudioResult: MultimediaContent[];
    searchTextResult: MultimediaContent[];
    
   videofilter: Boolean = true;
   audiofilter: Boolean = true;
   textfilter: Boolean = true;
   imagefilter: Boolean = true;

   filterbar:boolean = true;
   showSidebar: boolean = true;
   keywords:string;
   sub:any;
    constructor(private searchService: SearchService, private route: ActivatedRoute,
                private router: Router,private BookmarkService: BookmarkService){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        this.searchForm=new SearchForm('','','',new Date(),new Date(),'','')
    }

    ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchForm.freeText = params['keywords'] || '';
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
                      this.searchVideoResult= this.searchResult.filter(
                        mc => mc.type === 'video');
                        console.log('search video result size: '+this.searchVideoResult.length);
                      this.searchImgResult= this.searchResult.filter(
                        mc => mc.type === 'image');
                        console.log('search image result size: '+this.searchImgResult.length);
                      this.searchAudioResult= this.searchResult.filter(
                        mc => mc.type === 'audio');
                        console.log('search audio result size: '+this.searchAudioResult.length);
                      this.searchTextResult= this.searchResult.filter(
                        mc => mc.type === 'text');
                        console.log('search text result size: '+this.searchTextResult.length);
                      //console.log(this.searchResult);
                      this.submitted = false;
                  },
                  error => {
                      console.log('search - subscribe - error:',error);
                      this.submitted = false;
                  }
                )
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
                      console.log('saveMC - subscribe OK:',res.json());
                      this.searchResult=res.json();
                      this.savestate = false;
                  },
                  error => {
                      console.log('saveMC - subscribe - error:',error);
                      this.savestate = false;
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

