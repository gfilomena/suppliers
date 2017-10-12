import { McssrService } from './../_services/mcssr.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form.component';
import { SearchService } from './search.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
import {
         MdNativeDateModule,
         DateAdapter,
         MdDateFormats,
        //material 2.0.0.beta11
        MatProgressBarModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatChipsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        NativeDateAdapter,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatListModule
                          } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogRepositoryComponent, DialogRepositoryDetail } from '../dialog-repository/dialog-repository.component';
import { DialogDetail, SafePipe } from '../dialog-detail/dialog-detail.component';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { InternetArchiveService} from '../_services/internetarchive.service';
import { FilterbarComponent } from '../filterbar/filterbar.component';
import { ComponentsModule } from '../shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    ComponentsModule
  ],
  declarations: [
    SearchFormComponent,
    DialogRepositoryComponent,
    DialogRepositoryDetail,
    DialogDetail,
    BookmarksComponent,
    FilterbarComponent,
    SafePipe
  ],
  // entryComponents declare Components created manually
  entryComponents: [DialogDetail, DialogRepositoryDetail],
  providers: [ SearchService, McssrService, InternetArchiveService ]
})
export class SearchModule {

}
