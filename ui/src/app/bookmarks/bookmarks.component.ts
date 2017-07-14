import { Component, OnInit } from '@angular/core';
import { Bookmark } from "../_models/bookmark";
import { BookmarkService, AlertService } from "../_services/index";
import { DialogDetailComponent } from '../search/dialog-detail/dialog-detail.component';
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
