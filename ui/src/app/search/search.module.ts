import { McssrService } from './../_services/mcssr.service';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SearchFormComponent }    from './search-form.component';
import { SearchService } from './search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import "hammerjs";
import { MaterialModule, MdMenuModule , MdButtonModule, MdIconModule, MdTabsModule, MdInputModule, MdSelectModule, MdDatepickerModule,  MdNativeDateModule, DateAdapter, MdDateFormats, MdDialog, MdDialogRef } from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogRepositoryComponent, DialogRepositoryDetail } from '../dialog-repository/dialog-repository.component'

import { DialogDetail } from "../dialog-detail/dialog-detail.component";
import { BookmarksComponent } from '../bookmarks/bookmarks.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    SearchFormComponent,
    DialogRepositoryComponent,
    DialogRepositoryDetail,
    DialogDetail,
    BookmarksComponent
  ],
  // entryComponents declare Components created manually
  entryComponents: [DialogDetail,DialogRepositoryDetail],  
  providers: [ SearchService, McssrService ]
})
export class SearchModule {

}
