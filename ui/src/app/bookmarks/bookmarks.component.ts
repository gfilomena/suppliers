import { MultimediaContent } from './../_models/multimediaContent';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Bookmark } from '../_models/bookmark';
import { BookmarkService, AlertService } from '../_services/index';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserRepositoryService, RepositoryService } from '../_services/index';
import { UserRepository } from '../_models/user-repository';
import { Filter } from '../_models/filter';
import { PageEvent } from '@angular/material';
import { Snackbar } from './../snackbar/snackbar.component';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class BookmarksComponent implements OnInit {

    bookmarks: Bookmark[] = [];
    nResults: number;
    showSidebar = false;
    submitted = false;

    userRepositories: UserRepository[];
    activeRepositories: Filter[] = [];
    activeType: Filter[] = [];

    // init param smd-fab-speed-dial
    open = false;
    fixed = false;
    spin = false;
    direction = 'up';
    animationMode = 'fling';


    selected: Selected[] = [];
    selectAll = false;
    loading = false;

    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(private BookmarkService: BookmarkService,
        private alertService: AlertService,
        private dialog: MatDialog,
        private userRepositoryService: UserRepositoryService,
        public snackBar: Snackbar) { }


    ngOnInit() {
        this.getAllBookmarks();
    }

    topbarIN(event) {
        for (let i = 0; i < event.target.childNodes.length; i++) {
            if (event.target.childNodes[i].className === 'topbar') {
                event.target.childNodes[i].style.backgroundImage = 'linear-gradient(to top,rgba(0,0,0,0.26),transparent 56px,transparent)';
            }
        }
    }

    topbarOUT(event) {
        const list = event.target.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (list[i].className === 'topbar') {
                list[i].style.backgroundImage = '';
            }
        }
    }

    setSidebar(showSidebar) {
        this.showSidebar = showSidebar;
    }

    openDialog(item: MultimediaContent) {
        //console.log('item sr', item);

        const dialogRef = this.dialog.open(DialogDetailComponent, {
            width: '600px',
            // position: {left: '30%', right: '30%' }
        });
        item.bookmark = true;
        dialogRef.componentInstance.data = item;
        dialogRef.afterClosed().subscribe(result => {
            this.getAllBookmarks();
        });
    }

    initCheckbox() {
        this.selected = [];
        for (let i = 0; i < this.bookmarks.length; i++) {
            const item: Selected = { id: this.bookmarks[i].id, checked: false };
            this.selected.push(item);
        }
        // console.log("this.selected",this.selected);
    }

    enableDelete(): boolean {
        // show the delete button
        // console.log("enableDelete()", this.selected.find(obj => obj.checked === true));
        if (this.selected.findIndex(obj => obj.checked === true) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    getClassCheckbox(id: string): string {
        if (this.selected.find(obj => obj.id === id).checked === true) {
            return 'checked';
        }
    }

    getClassCard(id: string): string {
        if (this.selected.find(obj => obj.id === id).checked === true) {
            return 'card-selected';
        }
    }

    setCheckbox(id: string) {
        const index = this.selected.findIndex(obj => obj.id === id);
        if (index !== -1) {
            this.selected[index].checked = !this.selected[index].checked;
        }
    }

    getSelectedCount(): string {
        const count = this.selected.filter(item => item.checked === true).length;
        if (count === 1) {
            return '1 item selected';
        } else {
            return count + ' items selected';
        }
    }

    hovercard($event) {
        console.log("$event", $event);
    }


    getAllBookmarks() {
        this.submitted = true;
        this.BookmarkService.findByUser()
            .subscribe(
                data => {
                    this.bookmarks = data.reverse();
                    this.initCheckbox();
                    this.counter(data);
                    this.getUserRepositories();
                    this.submitted = false;
                    this.nResults = data.length;
                    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
                    //console.log(' this.bookmarks', this.bookmarks);
                },
                error => {
                    this.snackBar.run('Listing of repositories action has encountered an error. Detail:' + error, false);
                    console.log('getUserRepositories -> error:', error);
                    this.submitted = false;
                });
    }

    getUserRepositories() {
        this.userRepositoryService.findByUser()
            .subscribe(
                data => {
                    this.userRepositories = data;
                    this.initRepo(this.userRepositories);
                    this.incRepo(this.bookmarks);
                },
                error => {
                    this.snackBar.run('Listing of repositories action has encountered an error. Detail:' + error, false);
                    console.log('getUserRepositories -> error:', error);
                });
    }

    incRepo(bookmarks: Bookmark[]) {

        let i: number;
        let repository: string;

        for (i = 0; i < bookmarks.length; i++) {

            repository = bookmarks[i].multimediaContent.source.name;

            if (this.activeRepositories) {
                const index = this.activeRepositories.findIndex(obj => obj.name === repository);
                // console.log('this.activeRepositories',this.activeRepositories)
                // console.log('repository',repository)
                // console.log('item',index)
                if (index !== -1) {
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

            if (index !== -1) {
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

    removeBookmark(item: Bookmark) {
        this.BookmarkService.delete(item.id)
            .subscribe(
                data => {
                    //console.log('data', data);
                    const index = this.bookmarks.findIndex(obj => obj.id === item.id);
                    this.bookmarks.splice(index, 1);
                    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
                },
                error => {
                    this.snackBar.run('Delete action of the bookmark has encountered an error. Detail:' + error, false);
                    console.log('bookmarkService.delete -> error:', error);
                });
    }

    deleteSelected() {
        const dialogc = this.dialog.open(BookmarkConfirmationDialog, {
            data: { message: this.getSelectedCount() },
            height: 'auto'
        });

        dialogc.afterClosed().subscribe(confirm => {
            if (confirm) {

                let deleteList = '';
                const checked = this.selected.filter(item => item.checked === true);
                checked.forEach(function (i, idx, array) {
                    deleteList += array[idx].id;
                    if (idx < array.length - 1) {
                        deleteList += ',';
                    }
                });

                //console.log('deleteList:', deleteList);

                this.BookmarkService.delete(deleteList)
                    .subscribe(
                        data => {
                            //console.log('data', data);
                            checked.forEach(items => {
                                // delete selected
                                const i = this.selected.findIndex(obj => obj.id === items.id);
                                this.selected.splice(i, 1);
                                // delete in bookmarks
                                const j = this.bookmarks.findIndex(obj => obj.id === items.id);
                                this.bookmarks.splice(j, 1);
                            });
                            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
                        },
                        error => {
                            this.snackBar.run('Delete action of the bookmark has encountered an error. Detail:' + error, false);
                            console.log('bookmarkService.delete -> error:', error);
                        });
            }
        });
    }
    /*
        deleteAllByUser() {
            this.submitted = true;
            this.BookmarkService.deleteAllByUser()
                .subscribe(
                res => {
                    console.log('delete all Bookmarks - subscribe OK:', res);
                    this.bookmarks.splice(0, this.bookmarks.length);
                    this.nResults = this.bookmarks.length;
                    this.submitted = false;
                },
                error => {
                    console.log('delete all Bookmarks - subscribe - error:', error);
                    this.submitted = false;
                }
                );
        }
        */

    selecTo(choose: boolean) {
        this.selected.forEach(function (element) {
            element.checked = choose;
        });
    }
    /*
     UpdateBookmarks() {
         const lastresearch = JSON.parse(localStorage.getItem('lastresearch'));
         for (const item of this.bookmarks) {
             const index = lastresearch.findIndex(obj => obj.uri === item.multimediaContent.uri);
             lastresearch[index].bookmark = item.multimediaContent.bookmark;
         }
         localStorage.setItem('lastresearch', JSON.stringify(lastresearch));
     }
 
     UpdateBookmark(bm: Bookmark) {
         const lastresearch = JSON.parse(localStorage.getItem('lastresearch'));
         const index = lastresearch.findIndex(obj => obj.uri === bm.multimediaContent.uri);
         lastresearch[index].bookmark = bm.multimediaContent.bookmark;
         localStorage.setItem('lastresearch', JSON.stringify(lastresearch));
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

    getImage(mc: MultimediaContent): string {
        if (mc.thumbnail) {
            return mc.thumbnail;
        } else {
            return '../assets/images/logo_producer_511x103.jpg';
        }
    }

}

export interface Selected {
    id: string;
    checked: boolean;
}

@Component({
    selector: 'dialog-confirmation-dialog',
    templateUrl: 'dialog-confirmation-dialog.html',
})
export class BookmarkConfirmationDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}