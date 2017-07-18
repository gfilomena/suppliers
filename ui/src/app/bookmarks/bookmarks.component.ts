import { Component, OnInit } from '@angular/core';
import { Bookmark } from "../_models/bookmark";
import { BookmarkService, AlertService } from "../_services/index";


@Component({
  selector: 'app-bookmarks',
  inputs: ['multimediaContent'],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

   bookmarks: Bookmark[];
   videofilter: Boolean = true;
   audiofilter: Boolean = true;
   textfilter: Boolean = true;
   imagefilter: Boolean = true;

   filterbar:boolean = true;
   showSidebar: boolean = true;
   
  constructor( private BookmarkService:BookmarkService,
    private alertService: AlertService ) { }

  ngOnInit() {
    this.getAllBookmarks();
  }

    getAllBookmarks(){
    this.BookmarkService.getAll()
            .subscribe(
                data => {
                    console.log('data',data);
                    this.bookmarks = data;
                    localStorage.setItem("bookmarks",JSON.stringify(this.bookmarks));
                    console.log(' this.bookmarks', this.bookmarks);
                },
                error => {
                    this.alertService.error(error._body)
                })
    }

     removeBookmark(id:string){
        this.BookmarkService.delete(id)
            .subscribe(
                data => {
                     console.log('data',data);
                     this.getAllBookmarks();
                },
                error => {
                    this.alertService.error(error._body)
                })
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

}
