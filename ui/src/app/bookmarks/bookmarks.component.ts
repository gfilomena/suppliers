import { MultimediaContent } from './../_models/multimediaContent';
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

    VideoResult: number = 0;
    ImageResult: number = 0;
    AudioResult: number = 0;
    TextResult: number = 0;
    nResults: number;
   filterbar:boolean = true;
   showSidebar: boolean = true;
   submitted: boolean = false;

  constructor( private BookmarkService:BookmarkService,
    private alertService: AlertService ) { }

  ngOnInit() {
    this.getAllBookmarks();
  }

    getAllBookmarks(){
    this.submitted = true
    this.BookmarkService.getAll()
            .subscribe(
                data => {
                    this.bookmarks = data
                    this.counter(data)
                    this.submitted = false
                    this.nResults = data.length
                    localStorage.setItem("bookmarks",JSON.stringify(this.bookmarks));
                    console.log(' this.bookmarks', this.bookmarks);
                },
                error => {
                    this.alertService.error(error._body)
                     this.submitted = false
                })
    }

    counter(array) {
    var i:number
        for(i = 0;i<array.length;i++) { 
         var type = array[i].multimediaContent.type
         console.log('type::',type)
          switch(type) { 
            case 'video': { 
                console.log('video-array[i]',array[i])
                this.VideoResult++;
                break;
            } 
            case 'audio': { 
                console.log('audio-array[i]',array[i])
               this.AudioResult++;
               break;
            } 
            case 'image': { 
                console.log('image-array[i]',array[i])
               this.ImageResult++;
               break;
            } 
            case 'text': { 
                console.log('text-array[i]',array[i])
               this.TextResult++;
               break;
            } 
            default: { 
              break;
            } 
          } 

        }
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

    deleteAllByUser(){
        this.submitted = true;
        this.BookmarkService.deleteAllByUser()
                .subscribe(
                        res => {
                            console.log('delete all Bookmarks - subscribe OK:',res)
                            this.bookmarks.splice(0,this.bookmarks.length)
                            this.nResults = this.bookmarks.length;
                            this.VideoResult = 0;
                            this.ImageResult = 0;
                            this.AudioResult = 0;
                            this.TextResult = 0;
                            this.submitted = false;
                        },
                        error => {
                            console.log('delete all Bookmarks - subscribe - error:',error)
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
