import { OnInit, OnDestroy  } from '@angular/core';
import { Repository } from './../_models/repository';
import { SearchForm } from './../_models/search-form';
import { Bookmark } from './../_models/bookmark';
import { Component, Inject, HostListener, Output, EventEmitter, enableProdMode } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { User } from "../_models/user";
import { SearchService } from "./search.service";
import { BookmarkService } from "../_services/bookmark.service";
import { MultimediaContent } from "../_models/multimediaContent";
import { MdDialog, MdDialogRef, DateAdapter, MdSnackBar } from "@angular/material";
import { DialogDetail } from "../dialog-detail/dialog-detail.component";
import { NgSwitch } from '@angular/common';
import { CustomDateAdapter } from './custom-date-adapter'
import { Observable } from 'rxjs';
import { UserRepositoryService, RepositoryService } from "../_services/index";
import { UserRepository } from '../_models/user-repository';
import { FilterRepositories } from '../_models/filter-repositories';


@Component({
    selector: 'app-search-form',
    //issue #datepicker with the format date, CustomDateAdapter customize the native DateAdapter 
    providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
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

    VideoResult: number = 0;
    ImageResult: number = 0;
    AudioResult: number = 0;
    TextResult: number = 0;

    videofilter: Boolean = true;
    audiofilter: Boolean = true;
    textfilter: Boolean = true;
    imagefilter: Boolean = true;

    filterbar: boolean = true;
    showSidebar: boolean = false;
    history: any;
    nOfResults: number;
    bookmarks: Bookmark[];
    userRepositories: UserRepository[];
    activeRepositories: FilterRepositories[];



    constructor(private searchService: SearchService, private route: ActivatedRoute,
        private router: Router, private BookmarkService: BookmarkService,
        private dateAdapter: DateAdapter<Date>,
        private dialog: MdDialog,
        public snackBar: MdSnackBar,
        private userRepositoryService: UserRepositoryService) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        let historyform = JSON.parse(localStorage.getItem("searchForm"))
        let lastresearch = JSON.parse(localStorage.getItem("lastresearch"))

        this.dateAdapter.setLocale('ll');

        if (lastresearch) {
            //progress bar ON
            this.submitted = true;

            this.searchResult = lastresearch
            this.counter(this.searchResult)
            this.getUserRepositories()
            this.nOfResults = this.searchResult.length;

            
        }
        

        console.log("historyform",historyform);
            if (historyform === undefined || historyform === null) {
                console.log('undefined - this.searchForm', this.searchForm)
                console.log('NEW searchForm')
                let type: string[]
                this.searchForm = new SearchForm('', '', '', new Date(), new Date(), '')
            } else {
                this.searchForm = new SearchForm('', '', '', new Date(), new Date(), '')
                this.searchForm.freeText = historyform.freeText
                this.searchForm.inDate = new Date(historyform.inDate)
                this.searchForm.endDate = new Date(historyform.endDate)
            }
    }




    openDialog(mc) {


        let dialogRef = this.dialog.open(DialogDetail, {
            height: 'auto',
            width: '600px',
            position: { top: '0', left: '30%', right: '30%', bottom: '0' }
        });


        dialogRef.componentInstance.data = mc;

        const sub = dialogRef.componentInstance.mcupdate.subscribe(() => {
            console.log('const sub = dialogRef.componentInstance.mcupdate.subscribe:', mc)

        });
        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }


    @HostListener('window:scroll', ['$event'])
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
        console.log('this.searchForm', this.searchForm);
        localStorage.setItem("searchForm", JSON.stringify(this.searchForm));
        this.search();

    }
    
    clear(){
        console.log("clear")
        localStorage.removeItem("searchForm");
        localStorage.removeItem("lastresearch");
        this.searchForm = new SearchForm('', '', '', new Date(), new Date(), '')
        this.searchResult = [];
        this.counter(this.searchResult);
        this.getUserRepositories()
    }

    search() {
        this.searchService.search(this.searchForm)
            .subscribe(
            res => {
                this.searchResult = res.json().multimediaContents;
                console.log(res);
                localStorage.setItem("lastresearch", JSON.stringify(this.searchResult));

                this.counter(this.searchResult)
                this.getUserRepositories()
                //this.validator(this.searchResult)
                this.nOfResults = this.searchResult.length;
                //console.log('this.searchResult.length;',this.searchResult.length)
                this.submitted = false;
            },
            error => {
                console.log('search - subscribe - error:', error);
                this.submitted = false;
            }
            )
    }

    getUserRepositories() {
        this.userRepositoryService.findByUser()
            .subscribe(
            data => {
                this.userRepositories = data;
                this.initRepo(this.userRepositories);
                this.incRepo(this.searchResult)
                //console.log(' this.userRepositories', this.userRepositories);
                this.submitted = false;
            },
            error => {
                console.log('getUserRepositories -> error:', error);
            })
    }

    checkSaveBookmark(mc: MultimediaContent) {


        let bookmarks: Bookmark[];
        let exist: boolean = false;
        let responses$ = this.BookmarkService.findByUser().subscribe(
            res => {
                console.log('getBookmarks- subscribe - ok:', res);
                bookmarks = res;
                for (let item of res) {

                    if (mc.uri == item.multimediaContent.uri) {
                        console.log('mc:', mc.uri)
                        console.log('item:', item.multimediaContent.uri)
                        exist = true;
                    }
                }
                if (!exist) {
                    this.saveMC(mc);
                } else {
                    this.openSnackBar('The Bookmark was already saved', "error");
                }
            },
            error => {
                console.log('getBookmarks - subscribe - error:', error);
            }
        )
    }

    saveMC(mc: MultimediaContent) {

        let bookmark = new Bookmark(this.currentUser.username, mc);
        console.log('bookmark:', bookmark);

        this.BookmarkService.create(bookmark)
            .subscribe(
            res => {
                console.log('saveMC - subscribe OK:', res);
                let element = document.getElementById(mc.uri);
                element.innerText = "star"
            },
            error => {
                console.log('saveMC - subscribe - error:', error);
            }
            )
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    getImage(mc: MultimediaContent): string {
       if (mc.thumbnail) {
            return mc.thumbnail
        } else {
            return "../assets/images/logo_producer_511x103.jpg"
        }
    }

    counter(array) {
        let i: number;
        this.VideoResult = 0;
        this.AudioResult = 0;
        this.ImageResult = 0;
        this.TextResult = 0;
        // this.activeRepositories = [];
        for (i = 0; i < array.length; i++) {
            var type = array[i].type
            // console.log('type::',type)

            switch (type) {
                case 'video': {
                    // console.log('video-array[i]',array[i])
                    this.VideoResult++;
                    break;
                }
                case 'audio': {
                    // console.log('audio-array[i]',array[i])
                    this.AudioResult++;
                    break;
                }
                case 'image': {
                    // console.log('image-array[i]',array[i])
                    this.ImageResult++;
                    break;
                }
                case 'text': {
                    // console.log('text-array[i]',array[i])
                    this.TextResult++;
                    break;
                }
                default: {
                    break;
                }
            }

        }
    }

    incRepo(array) {
        let i: number;
        let repository: string;

        for (i = 0; i < array.length; i++) {

            repository = array[i].source.name;

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
        //console.log("this.activeRepositories",this.activeRepositories);
        let repository = item.source.name;
        //console.log("repository->",repository);
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

    sidebar(size: number): number {
        if (this.showSidebar) {
            return 0;
        } else {
            return size;
        }
    }

    getDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

}



