import { McssrService } from './../_services/mcssr.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchFormComponent } from './search-form.component';
import { SearchService } from './search.service';
import { SemanticService } from '../semantic-search/semantic.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';
import {
         MatNativeDateModule,
         DateAdapter,
         MatDateFormats,
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
        MatListModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatTableModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatPaginatorModule,
        MatRadioModule,
        MatRippleModule,
        MatSidenavModule,
        MatSliderModule,
        MatSortModule,
        MatTabsModule,
        MatToolbarModule
                          } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogRepositoryComponent, DialogRepositoryDetail, DialogConfirmationDialog } from '../dialog-repository/dialog-repository.component';
import { DialogDetail, SafePipe } from '../dialog-detail/dialog-detail.component';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';
import { InternetArchiveService} from '../_services/internetarchive.service';
import { FilterbarComponent } from '../filterbar/filterbar.component';
import { ComponentsModule } from '../shared/components.module';
import { SemanticSearchComponent } from "../semantic-search/semantic-search.component";
import { InputFileComponent } from "../input-file/input-file.component";

import { CdkTableModule } from '@angular/cdk/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    ComponentsModule,
    MatStepperModule,
    CdkTableModule,
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule
  ],
  declarations: [
    SearchFormComponent,
    DialogRepositoryComponent,
    DialogRepositoryDetail,
    DialogDetail,
    BookmarksComponent,
    FilterbarComponent,
    SafePipe,
    SemanticSearchComponent,
    InputFileComponent,
    DialogConfirmationDialog
  ],
  // entryComponents declare Components created manually
  entryComponents: [DialogDetail, DialogRepositoryDetail, DialogConfirmationDialog],
  providers: [ SearchService, McssrService, InternetArchiveService, SemanticService ]
})
export class SearchModule {

}
