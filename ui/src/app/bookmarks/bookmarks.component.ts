import { MultimediaContent } from './../_models/multimediaContent';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from "../_models/bookmark";
import { BookmarkService, AlertService } from "../_services/index";
import { DialogDetail } from "../dialog-detail/dialog-detail.component";
import { MdDialog } from "@angular/material";
import { UserRepositoryService, RepositoryService } from "../_services/index";
import { UserRepository } from '../_models/user-repository';
import { FilterRepositories } from '../_models/filter-repositories';

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

    userRepositories: UserRepository[];
    activeRepositories: FilterRepositories[];

  constructor( private BookmarkService:BookmarkService,
               private alertService: AlertService,
               private dialog: MdDialog,
               private userRepositoryService: UserRepositoryService ) { }

  ngOnInit() {
    this.getAllBookmarks();
  }

openDialog(item:MultimediaContent) {
    console.log('item sr',item);
        let dialogRef = this.dialog.open(DialogDetail, {
        height: 'auto',
        width: '600px',
        position:  {top: '0', left: '30%',right:'30%', bottom:'0'}
        });

    dialogRef.componentInstance.data = item;
}


    getAllBookmarks(){
    this.submitted = true
    this.BookmarkService.getAll()
            .subscribe(
                data => {
                    this.bookmarks = data.reverse()
                    this.counter(data)
                    this.getUserRepositories()
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

    getUserRepositories() {
        this.userRepositoryService.findByUser()
            .subscribe(
            data => {
                this.userRepositories = data;
                this.initRepo(this.userRepositories);
                this.incRepo(this.bookmarks)
                console.log(' this.userRepositories', this.userRepositories);
            },
            error => {
                console.log('getUserRepositories -> error:', error);
            })
    }

    incRepo(bookmarks:Bookmark[]) {
        
        let i: number;
        let repository: string;

        for (i = 0; i < bookmarks.length; i++) {

            repository = bookmarks[i].multimediaContent.source.name;

            if (this.activeRepositories) {
                let index = this.activeRepositories.findIndex(obj => obj.name == repository)
                //console.log("this.activeRepositories",this.activeRepositories)
                //console.log("repository",repository)
                //console.log("item",index)
                if (index > -1) {
                    this.activeRepositories[index].count = this.activeRepositories[index].count + 1;
                }
            }

        }

    }

    initRepo(array: UserRepository[]) {
        let i: number;
        let repository: string;
        this.activeRepositories = [];
        for (i = 0; i < array.length; i++) {
            let enabled = array[i].enabled;
            if (enabled) {
                repository = array[i].repository;
                //console.log("repository::",repository);
                this.activeRepositories.push(new FilterRepositories(repository));
            }
        }
        //console.log("end initRepo",this.activeRepositories)
    }

    filterRepository(item: MultimediaContent): boolean {
        console.log("this.activeRepositories",this.activeRepositories);
        let repository = item.source.name;
        console.log("repository->",repository);
        if (this.activeRepositories) {
            let index = this.activeRepositories.findIndex(obj => obj.name == repository)

            if (index > -1) {
                return this.activeRepositories[index].enabled;
            } else {
                return false;
            }
        }


        return false;
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

    filter(item: MultimediaContent): any {
        let repo: boolean;

        if (this.filterRepository(item)) {

            switch (item.type) {
                case 'video': {
                    if (this.videofilter) {
                        return true;
                    } else {
                        return false
                    }
                }
                case 'audio': {
                    if (this.audiofilter) {
                        return true;
                    } else {
                        return false
                    }
                }
                case 'image': {
                    if (this.imagefilter) {
                        return true;
                    } else {
                        return false
                    }
                }
                case 'text': {
                    if (this.textfilter) {
                        return true;
                    } else {
                        return false
                    }
                }
                default: {
                    return true;
                }
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
