import { SearchResult } from './../_models/search-result';
import { Observable } from 'rxjs/Observable';
import { OnInit, OnDestroy } from '@angular/core';
import { Repository } from './../_models/repository';
import { SearchForm } from './../_models/search-form';
import { Bookmark } from './../_models/bookmark';
import { Component, Inject, HostListener, Output, EventEmitter, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../_models/user';
import { SearchService } from './search.service';
import { BookmarkService } from '../_services/bookmark.service';
import { MultimediaContent } from '../_models/multimediaContent';
import {
    MatDialog,
    MatDialogRef,
    DateAdapter,
    MatSnackBar,
    MatNativeDateModule,
    MatDatepickerModule,
    MAT_DATE_FORMATS,
} from '@angular/material';
import { DialogDetail } from '../dialog-detail/dialog-detail.component';
import { NgSwitch } from '@angular/common';
import { CustomDateAdapter } from './custom-date-adapter';
import { UserRepositoryService, RepositoryService } from '../_services/index';
import { UserRepository } from '../_models/user-repository';
import { Filter } from '../_models/filter';
import { MY_DATE_FORMATS } from './mydateformats';


@Component({
    selector: 'app-search-form',
    // issue #datepicker with the format date, CustomDateAdapter customize the native DateAdapter
    providers: [
        // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ],
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SearchFormComponent {
    submitted = false;
    savestate = false;
    currentUser: User;
    types = ['Audio', 'Video', 'Text', 'Image'];
    searchForm: SearchForm;
    searchResult: MultimediaContent[] = [];
    filterbar = true;
    showSidebar = false;
    history: any;
    nOfResults: number = -1;
    bookmarks: Bookmark[];
    userRepositories: UserRepository[];
    activeRepositories: Filter[] = [];
    activeType: Filter[] = [];

    // init param smd-fab-speed-dial
    open = false;
    fixed = false;
    spin = false;
    direction = 'up';
    animationMode = 'fling';



    // _click(event: any) {
    //    console.log(event);
    // }



    constructor(
        private searchService: SearchService, 
        private route: ActivatedRoute,
        private BookmarkService: BookmarkService,
        private dateAdapter: DateAdapter<Date>,
        private dialog: MatDialog,
        public snackBar: MatSnackBar,
        private userRepositoryService: UserRepositoryService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const lastresearch = JSON.parse(localStorage.getItem('lastresearch'));
        this.dateAdapter.setLocale('ll');

        //initialize

        if (lastresearch) {
            //progress bar ON
            this.submitted = true;

            this.searchResult = lastresearch;
            this.counter(this.searchResult);
            this.incRepo(this.searchResult);
            //this.getUserRepositories();
            this.nOfResults = this.searchResult.length;
        }

        // if there are url parameters, they will insert into the searchform
        this.searchForm = new SearchForm( '', '', '', new Date(), new Date(), '');

        const params = this.route.queryParamMap;

        params.map( par => par.get('keywords')).subscribe(
            res => {
                if (res != null) {
                    this.searchForm.freeText = res;
                    //console.log("OK"+res);
                }
           }, error => {
                   console.log("keywords ERROR:" + error);
           }
        )

        params.map( par => par.get('inDate')).subscribe(
            res => {
                if (res != null) {
                    this.searchForm.inDate = new Date(res);
                    //console.log("inDate OK"+res);
                }
           }, error => {
                   console.log("inDate ERROR:" + error);
           }
        )

        params.map( par => par.get('endDate')).subscribe(
            res => {
                if (res != null) {
                    this.searchForm.endDate = new Date(res);
                    //console.log("endDate OK"+res);
                }
           }, error => {
                   console.log("endDate ERROR:" + error);
           }
        )

    }



    setSidebar(showSidebar) {
        this.showSidebar = showSidebar;
    }

    change_placeholder(changes: any) {
        //console.log('changes', changes)
    }


    openDialog(mc) {


        const dialogRef = this.dialog.open(DialogDetail, {
        });


        dialogRef.componentInstance.data = mc;

        const sub = dialogRef.componentInstance.mcupdate.subscribe(() => {
            //console.log('const sub = dialogRef.componentInstance.mcupdate.subscribe:', mc);
            this.UpdateMC(mc);
        });
        dialogRef.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }

/*  
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {

        const status = 'not reached';
        const windowHeight = 'innerHeight' in window ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body, html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight,
            body.offsetHeight, html.clientHeight,
            html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom + 1 >= docHeight) {
           // console.log('bottom reached');
        }
    }
*/

    onSubmit() {

        this.submitted = true;
        // console.log('this.searchForm', this.searchForm);
        localStorage.setItem('searchForm', JSON.stringify(this.searchForm));
        this.search();

    }

    clear() {
        //console.log('clear')
        localStorage.removeItem('searchForm');
        localStorage.removeItem('lastresearch');
        this.searchForm = new SearchForm('', '', '', new Date(), new Date(), '')
        this.searchResult = [];
        this.counter(this.searchResult);
        this.incRepo(this.searchResult);
        //this.getUserRepositories();
    }

    search() {
        this.searchService.search(this.searchForm)
            .subscribe(
            res => {
                this.searchResult = res.json().multimediaContents;
                 console.log('res.json()',res.json());
                // console.log('search result:');
                // console.log(this.searchResult);
                localStorage.setItem('lastresearch', JSON.stringify(this.searchResult));

                this.counter(this.searchResult);
                //this.getUserRepositories();
                this.incRepo(this.searchResult);
                // this.validator(this.searchResult)
                this.nOfResults = this.searchResult.length;
                // console.log('this.searchResult.length;',this.searchResult.length)
            },
            error => {
                console.log('search - subscribe - error:', error);
                this.submitted = false;
            }
            )
    }
/*
    getUserRepositories() {
        this.userRepositoryService.findByUser()
            .subscribe(
            data => {
                this.userRepositories = data;
                console.log('userRepositoryService',data);
                this.incRepo(this.searchResult);
                this.submitted = false;
            },
            error => {
                console.log('getUserRepositories -> error:', error);
            })
    }
    */

    checkSaveBookmark(mc: MultimediaContent) {


        let bookmarks: Bookmark[];
        let exist = false;
        const response = this.BookmarkService.findByUser().subscribe(
            res => {
                console.log('getBookmarks- subscribe - ok:', res);
                bookmarks = res;
                for (const item of res) {

                    if (mc.uri === item.multimediaContent.uri) {
                        console.log('mc:', mc.uri);
                        console.log('item:', item.multimediaContent.uri);
                        exist = true;
                    }
                }
                if (!exist) {
                    this.saveMC(mc);
                } else {
                    this.openSnackBar('The Bookmark was already saved', 'ERROR');
                }
            },
            error => {
                console.log('getBookmarks - subscribe - error:', error);
            }
        )
    }


    UpdateMC(mc: MultimediaContent) {
        const newSearchResult: MultimediaContent[] = [];
        for (const item of this.searchResult) {
            const index = this.searchResult.findIndex(obj => obj.uri === mc.uri);
            this.searchResult[index] = mc;
        }
        localStorage.setItem('lastresearch', JSON.stringify(this.searchResult));
    }

    saveMC(mc: MultimediaContent) {

        const bookmark = new Bookmark(this.currentUser.username, mc);
        //console.log('bookmark:', bookmark);

        this.BookmarkService.create(bookmark)
            .subscribe(
            res => {
                //console.log('saveMC OK:', res);
                //const element = document.getElementById(mc.uri);
                //element.innerText = 'star';
                mc.bookmark = true;
                this.UpdateMC(mc);
                this.openSnackBar('The Bookmark has been saved', 'OK');
            },
            error => {
                this.openSnackBar('The Bookmark has NOT been saved correctly', 'ERROR');
                console.log('saveMC - error:', error);
            }
            )
    }

    stateBookmark(mc: MultimediaContent): string {
        // console.log('mc.bookmark', mc.bookmark);
        if (mc.bookmark) {
            return 'star';
        } else {
            return 'star_border';
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000
        });
    }

    getImage(mc: MultimediaContent): string {
        if (mc.thumbnail) {
            return mc.thumbnail;
        } else {
            return '/assets/images/logo_producer_511x103.jpg';
        }
    }

    counter(array) {
        // console.log('array',array)
        const activeType: Filter[] = [new Filter('video'), new Filter('audio'), new Filter('image'), new Filter('text')];
        //  console.log('  activeType',  activeType)
        let i: number;
        // this.activeRepositories = [];
        for (i = 0; i < array.length; i++) {
            const type = array[i].type;
            // find type
            const index = activeType.findIndex(obj => obj.name === type);
            // increment type counter
            activeType[index].count = activeType[index].count + 1;
        }
        this.activeType = activeType;
    }

    incRepo(array:MultimediaContent[]) {
        let i: number;
        let repository: string;
        // init Repositories
        this.activeRepositories = [];
        const repo: string[] = array.map(obj => obj.source.name);
        for (i = 0; i < array.length; i++) {
                const index = this.activeRepositories.findIndex(obj => obj.name === repo[i]);
                if (index === -1) {
                this.activeRepositories.push(new Filter(repo[i]));
            }
        }
        console.log(' array', array);
        console.log(' this.activeRepositories', this.activeRepositories);
        // count repositories
        for (i = 0; i < array.length; i++) {

            repository = array[i].source.name;

            if (this.activeRepositories) {
                const index = this.activeRepositories.findIndex(obj => obj.name === repository)
                if (index > -1) {
                    this.activeRepositories[index].count = this.activeRepositories[index].count + 1;
                }
            }

        }
        console.log('COUNT this.activeRepositories', this.activeRepositories);
        this.submitted = false;
    }
/*
    initRepo(arr:MultimediaContent[]) {
        let i: number;
        let repository: string;
        this.activeRepositories = [];
       let array: string[] = arr.map(obj => obj.source.name);
console.log('repooo',array);
        for (i = 0; i < array.length; i++) {
            //const enabled = array[i].enabled;
            //if (enabled) {
                this.activeRepositories.push(new Filter(array[i]));
            //}
        }

    }
*/
    filterRepository(item: MultimediaContent): boolean {
        // console.log('this.activeRepositories',this.activeRepositories);
        const repository = item.source.name;
        // console.log('repository->',repository);
        if (this.activeRepositories) {
            const index = this.activeRepositories.findIndex(obj => obj.name === repository);
            if (index !== -1) {
                return this.activeRepositories[index].enabled;
            }
        }
        return false;
    }
/*
    filter(item: MultimediaContent): any {
        if (this.filterRepository(item)) {
            if (this.activeType) {
                const index = this.activeType.findIndex(obj => obj.name === item.type);
                if (index !== -1) {
                    return this.activeType[index].enabled;
                }
            }
            return false;
        }
    }
*/
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

    addAnnotationToSearchForm(annotation: string): void {

        (this.searchForm.freeText !== "") ?
            this.searchForm.freeText += " " + annotation :
            this.searchForm.freeText += annotation;

    }

}

function uniq(a) {
    return Array.from(new Set(a));
 }

