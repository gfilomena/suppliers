import { MultimediaContent } from './../_models/multimediaContent';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../_models/bookmark';
import { BookmarkService, AlertService } from '../_services/index';
import { DialogDetail } from '../dialog-detail/dialog-detail.component';
import { MdDialog } from '@angular/material';
import { UserRepositoryService, RepositoryService } from '../_services/index';
import { UserRepository } from '../_models/user-repository';
import { Filter } from '../_models/filter';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

    bookmarks: Bookmark[];
    nResults: number;
    showSidebar = false;
    submitted = false;

    userRepositories: UserRepository[];
    activeRepositories: Filter[];
    activeType: Filter[];

    constructor(private BookmarkService: BookmarkService,
        private alertService: AlertService,
        private dialog: MdDialog,
        private userRepositoryService: UserRepositoryService) { }

    ngOnInit() {
        this.getAllBookmarks();
    }

    setSidebar(showSidebar) {
        this.showSidebar = showSidebar;
    }

    openDialog(item: MultimediaContent) {
        console.log('item sr', item);
        let dialogRef = this.dialog.open(DialogDetail, {
            height: 'auto',
            width: '600px',
            position: { top: '0', left: '30%', right: '30%', bottom: '0' }
        });

        dialogRef.componentInstance.data = item;
    }


    getAllBookmarks() {
        this.submitted = true
        this.BookmarkService.getAll()
            .subscribe(
            data => {
                this.bookmarks = data.reverse()
                this.counter(data)
                this.getUserRepositories()
                this.submitted = false
                this.nResults = data.length
                localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
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

    incRepo(bookmarks: Bookmark[]) {

        let i: number;
        let repository: string;

        for (i = 0; i < bookmarks.length; i++) {

            repository = bookmarks[i].multimediaContent.source.name;

            if (this.activeRepositories) {
                let index = this.activeRepositories.findIndex(obj => obj.name == repository)
                // console.log('this.activeRepositories',this.activeRepositories)
                // console.log('repository',repository)
                // console.log('item',index)
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
            const enabled = array[i].enabled;
            if (enabled) {
                repository = array[i].repository;
                // console.log('repository::',repository);
                this.activeRepositories.push(new Filter(repository));
            }
        }
        // console.log('end initRepo',this.activeRepositories)
    }

    filterRepository(item: MultimediaContent): boolean {
        // console.log('this.activeRepositories',this.activeRepositories);
        const repository = item.source.name;
        // console.log('repository->',repository);
        if (this.activeRepositories) {
            const index = this.activeRepositories.findIndex(obj => obj.name === repository);

            if (index > -1) {
                return this.activeRepositories[index].enabled;
            } else {
                return false;
            }
        }


        return false;
    }

    counter(array) {
        const activeType: Filter[] = [new Filter('video'), new Filter('audio'), new Filter('image'), new Filter('text')];
        let i: number;
        // this.activeRepositories = [];
        for (i = 0; i < array.length; i++) {
            const type = array[i].multimediaContent.type;
            // find type
            const index = activeType.findIndex(obj => obj.name === type);
            // increment type counter
            activeType[index].count = activeType[index].count + 1;
        }
        this.activeType = activeType;
    }

    removeBookmark(id: string) {
        this.BookmarkService.delete(id)
            .subscribe(
            data => {
                console.log('data', data);
                this.getAllBookmarks();
            },
            error => {
                this.alertService.error(error._body)
            })
    }

    deleteAllByUser() {
        this.submitted = true;
        this.BookmarkService.deleteAllByUser()
            .subscribe(
            res => {
                console.log('delete all Bookmarks - subscribe OK:', res)
                this.bookmarks.splice(0, this.bookmarks.length)
                this.nResults = this.bookmarks.length;
                this.submitted = false;
            },
            error => {
                console.log('delete all Bookmarks - subscribe - error:', error)
                this.submitted = false;
            }
            )
    }

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

    getImage(mc: MultimediaContent): string {
        if (mc.thumbnail) {
            return mc.thumbnail;
        } else {
            return '../assets/images/logo_producer_511x103.jpg';
        }
    }

}
