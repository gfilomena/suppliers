import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchModule } from './search/search.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import {
    AlertService,
    AuthenticationService,
    AuthService,
    UserService,
    RepositoryService,
    UserRepositoryService,
    BookmarkService,
    HistorysearchService,
    McssrService,
    VimeoService,
    ValidatorService
    /*PagerService*/
} from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavbarComponent } from './navbar/index';
import { LoggedinComponent } from './loggedin/index';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingComponent } from './profile/setting/setting.component';
import { SearchHistoryComponent, HistoryConfirmationDialog } from './search-history/search-history.component';
import { BreadcrumbComponent } from './navbar/breadcrumb/breadcrumb.component';
import {
    DialogRegistrationRepository,
    RegistrationRepositoryComponent,
    DialogRegistrationDialog
} from './profile/setting/registration-repository/registration-repository.component';
import { BookmarkConfirmationDialog } from './bookmarks/bookmarks.component';
import { ProfileComponent } from './profile/profile.component';
import {
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule
} from '@angular/material';
import { ComponentsModule } from './shared/components.module';
// import { SemanticSearchComponent } from './semantic-search/semantic-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';
import { Globals } from './global';
import { Snackbar } from './snackbar/snackbar.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SearchModule,
        AppRoutingModule,
        // NoopAnimationsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatMenuModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatDialogModule,
        ComponentsModule,
        NgxPaginationModule,
        MatExpansionModule,
        MatCheckboxModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        LoggedinComponent,
        SettingComponent,
        SearchHistoryComponent,
        BreadcrumbComponent,
        DialogRegistrationRepository,
        RegistrationRepositoryComponent,
        ProfileComponent,
        DialogRegistrationDialog,
        BookmarkConfirmationDialog,
        HistoryConfirmationDialog,
        Snackbar
        // SemanticSearchComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        AuthService,
        UserService,
        RepositoryService,
        UserRepositoryService,
        BookmarkService,
        HistorysearchService,
        McssrService,
        VimeoService,
        Globals,
        Snackbar,
        ValidatorService
    ],
    entryComponents: [RegistrationRepositoryComponent, DialogRegistrationRepository, DialogRegistrationDialog, BookmarkConfirmationDialog, HistoryConfirmationDialog],
    bootstrap: [AppComponent]
})

export class AppModule { }
