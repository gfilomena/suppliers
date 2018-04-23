import { element } from 'protractor';
import { McssrService } from './../_services/mcssr.service';
import { MultimediaContent } from './../_models/multimediaContent';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Component, OnInit, Input, Inject, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipsModule, MatSnackBar, MatSnackBarModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../_models/user';
import { Bookmark } from './../_models/bookmark';
import { BookmarkService } from '../_services/bookmark.service';
import { InternetArchiveService } from '../_services/internetarchive.service';
import { mediafile, File } from './../_models/mediafile';
import * as mime from 'mime-types';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from "@angular/cdk/table";
import { Snackbar } from './../snackbar/snackbar.component';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'dialog-detail-dialog',
    templateUrl: 'dialog-detail-dialog.html',
    styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetail implements OnInit {
    loaderror = true;
    currentUser: User;
    tagInsert = false;
    loading = false;
    title = true;
    details: mediafile = null;
    formats: File[] = null;
    path = '';
    formatVideo: String[] = ['ogv', 'ogg', 'mp4', 'WebM', 'webm'];
    formatAudio: String[] = ['mp3', 'mpga'];
    formatImage: String[] = ['jpeg', 'jpg', 'png', 'gif'];
    formatText: String[] = ['text', 'html', 'pdf'];
    selectedFormat = '';
    othersrep: String[] = ['Youtube', 'Vimeo', 'InternetArchive'];

    @Input() data: MultimediaContent;
    @Output() mcupdate = new EventEmitter<MultimediaContent>();

    constructor(
        public dialogRef: MatDialogRef<DialogDetail>,
        public sanitizer: DomSanitizer,
        public http: Http,
        private BookmarkService: BookmarkService,
        private McssrService: McssrService,
        public snackBar: Snackbar,
        private InternetArchiveService: InternetArchiveService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }


    ngOnInit() {
        console.log('init mc:', this.data)
        // this.uriValidation(this.getVideoSource(this.data.downloadURI));
        if (this.data.source.name === 'InternetArchive') {
            this.getInternetArchiveformat(this.data.uri);
        }
        if (this.othersrep.indexOf(this.data.source.name) === -1) {
            this.selectedFormat = this.data.downloadURI;
        } else {
            this.selectedFormat = '';
        }
    }

    getVideoSource(URI: string): any {
        console.log('getVideoSource:', URI);
        const link = this.sanitizer.bypassSecurityTrustResourceUrl(URI);
        console.log('link:', link);
        return link;
    }

    isDisabled(): boolean {
        return this.title;
    }

    toggle() {
        this.title = !this.title;
    }



    getInternetArchiveformat(url: string) {
        url = encodeURI(url);
        console.log('url', url);
        this.InternetArchiveService.getDetails(url).subscribe(
            res => {
                this.details = res;
                this.formats = this.filtertype(this.details);
                this.path = this.details.server + this.details.dir + '/';
                // set the first value as default
                this.selectedFormat = this.formats[0].name;
                console.log('formats', this.formats);
                //console.log('this.selectedFormat',this.selectedFormat);
                this.onChange(this.formats[0].name);
            },
            error => {
                this.snackBar.run('Listing of formats files type action has encountered an error. Detail:' + error, false);
                console.log('getInternetArchiveformat - subscribe - error:', error);
            }
        )

    }

    getExt(uri: String): String {
        // console.log('mimetype:', mime.lookup(uri))
        return mime.extension(mime.lookup(uri))
    }

    getMB(byte: number) {
        const num = byte / 1048576;
        return num.toPrecision(3);
    }

    filtertype(array: mediafile): File[] {
        const finals: File[] = [];
        let i: number;

        for (i = 0; i < array.files.length; i++) {

            const extension = this.getExt(array.files[i].name);
            // console.log('array.files[i].name',array.files[i].name)
            // console.log('extension',extension)

            if (this.acceptedFormat(extension) > -1) {
                // console.log('ADD array.files[i].name', array.files[i].name)
                finals.push(array.files[i]);
            }
        }
        console.log('finals', finals);
        return finals;
    }

    acceptedFormat(extension): number {

        switch (this.data.type) {
            case 'video': {
                return this.formatVideo.indexOf(extension);
            }
            case 'audio': {
                return this.formatAudio.indexOf(extension);
            }
            case 'image': {
                return this.formatImage.indexOf(extension);
            }
            case 'text': {
                return this.formatText.indexOf(extension);
            }
            default: {
                return -1;
            }
        }
    }


    onChange(name) {
        this.selectedFormat = name;
        this.data.downloadURI = 'https:\/\/' + this.path + name;
        console.log('onChange - this.data.downloadURI', this.data.downloadURI);
        this.data.fileExtension = mime.lookup(this.data.downloadURI);
        console.log('this.data.fileExtension', this.data.fileExtension);
        // let element:HTMLElement = document.getElementById('video');
        switch (this.data.type) {
            case 'video': {
                const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('video');
                console.log('video', video);
                video.load();
                break;
            }
            case 'audio': {
                const audio: HTMLAudioElement = <HTMLAudioElement>document.getElementById('audio');
                console.log('audio', audio);
                audio.load();
                break;
            }
        }
    }


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
                    this.deleteMCBookmark(mc);
                }
            },
            error => {
                this.snackBar.run('Checking on the saving bookmark action has encountered an error. Detail:' + error, false);
                console.log('getBookmarks - subscribe - error:', error);
            }
        )
    }

    deleteMCBookmark(mc) {
        this.BookmarkService.findByUser()
            .subscribe(
                data => {
                    for (const bookmark of data) {
                        if (mc.source['id'] === bookmark.multimediaContent.source['id']) {

                            this.BookmarkService.delete(bookmark.id)
                                .subscribe(
                                    data => {
                                        mc.bookmark = false;
                                        this.mcupdate.emit(mc);
                                        this.snackBar.run('The Bookmark has been removed', true);
                                    },
                                    error => {
                                        this.snackBar.run('Delete action of the bookmark has encountered an error. Detail:' + error, false);
                                        console.log('bookmarkService.delete -> error:', error);
                                    });

                            break;
                        }
                    }
                }
            )
    }

    saveMC(mc: MultimediaContent) {
        const bookmark = new Bookmark(this.currentUser.username, mc);
        console.log('bookmark:', bookmark);

        this.BookmarkService.create(bookmark)
            .subscribe(
                res => {
                    console.log('saveMC - subscribe OK:', res);
                    //const element = document.getElementById('(' + mc.uri + ')');
                    //console.log('element ', element);
                    //element.innerText = 'star';
                    mc.bookmark = true;
                    this.mcupdate.emit(mc);
                    this.snackBar.run('The bookmark has been saved', true);
                },
                error => {
                    this.snackBar.run('Saving bookmark action has encountered an error. Detail:' + error, false);
                    console.log('saveMC - subscribe - error:', error);
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


    saveTag(mc: MultimediaContent, newtag: string) {
        console.log('newtag', newtag);
        console.log('before-mc', mc);
        if (mc.metadata == null) { mc.metadata = []; }
        if (mc.metadata.find(x => x === newtag) === undefined && !isNullOrWhiteSpace(newtag)) {
            mc.metadata.push(newtag);
            // empty input tag
            (<HTMLInputElement>document.getElementById('newtag')).value = '';

        }
        this.mcupdate.emit(mc);
    }

    removeTag(mc: MultimediaContent, tag: string) {
        const index = mc.metadata.findIndex(x => x === tag);
        if (index !== -1 && !isNullOrWhiteSpace(tag)) {
            mc.metadata.splice(index, 1);
        }
    }

    sendMcssr(mc: MultimediaContent) {
        this.loading = true;
        this.McssrService.create(mc)
            .subscribe(
                res => {
                    this.snackBar.run('The Multimedia Item has been sent to Mcssr', true);
                    console.log('Send to Mcssr - subscribe OK:', res);
                    let creationResponse = res.json();
                    let uid = creationResponse.uid;
                    // if there are tags , they will be sent to MCSSR
                    if (mc.metadata != null) {
                        this.McssrService.updateTags(mc, uid)
                            .subscribe(
                                res => {
                                    console.log('update Tags to Mcssr - subscribe OK:', res);
                                    this.loading = false;
                                    this.snackBar.run('The tags have been sent correctly to Mcssr', true);
                                },
                                error => {
                                    console.log('Send to Mcssr - subscribe - error:', error);
                                    this.loading = false;
                                    this.snackBar.run('The tags have\'t been sent to Mcssr. Detail:' + error, false);
                                }
                            )
                    }
                    this.loading = false;
                },
                error => {
                    console.log('Send to Mcssr - subscribe - error:', error);
                    this.loading = false;
                    this.snackBar.run('The Multimedia Item hasn\'t been sent to Mcssr', false);
                }
            )
    }

    uriValidation(uri: string) {
        // Tried adding headers with no luck
        const header = new Headers();
        header.append('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        header.append('Access-Control-Allow-Methods', 'GET');
        header.append('Access-Control-Allow-Methods', 'OPTION');
        header.append('Access-Control-Allow-Origin', '*');
        const options: RequestOptionsArgs = {
            headers: header
        };

        console.log('uriValidation', uri);

        this.http.options(uri, options).map(result => {
            const data = result.json();
            const location = result.headers.get('Location');
            console.log('data:', data);
            return data;
        }).subscribe(
            data => {
                console.log('data', data);
                this.loaderror = true;
            },
            error => {
                this.snackBar.run('uriValidation check has encountered an error. Detail:' + error, false);
                console.log('err', error);
                this.loaderror = false;
            })
    }

}

function isNullOrWhiteSpace(str) {
    return str == null || str.replace(/\s/g, '').length < 1;
}
