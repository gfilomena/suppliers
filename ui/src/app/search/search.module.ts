import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SearchFormComponent }    from './search-form.component';
import { SearchResultComponent }  from './search-result.component';
import { SearchService } from './search.service';
import { SearchRoutingModule } from './search-routing.module';
import { MultimediaContentComponent } from '../multimedia-content/multimedia-content.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NoopAnimationsModule} from "@angular/platform-browser/animations"
import "hammerjs";
import { MaterialModule, MdMenuModule , MdButtonModule, MdIconModule, MdTabsModule, MdInputModule, MdSelectModule, MdDatepickerModule,  MdNativeDateModule, DateAdapter, MdDateFormats, MdDialog, MdDialogRef } from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogDetailComponent,DialogDetail } from "../dialog-detail/dialog-detail.component";
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    SearchFormComponent,
    SearchResultComponent,
    MultimediaContentComponent,
    DialogDetailComponent,
    DialogDetail
  ],
  entryComponents: [DialogDetail],
  providers: [ SearchService ]
})
export class SearchModule {}
