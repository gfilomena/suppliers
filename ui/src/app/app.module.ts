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
    McssrService
    /*PagerService*/
} from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavbarComponent } from './navbar/index';
import { LoggedinComponent } from './loggedin/index';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingComponent } from './profile/setting/setting.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { BreadcrumbComponent } from './navbar/breadcrumb/breadcrumb.component';
import {
    DialogRegistrationRepository,
    RegistrationRepositoryComponent,
    DialogRegistrationDialog
} from './profile/setting/registration-repository/registration-repository.component';
import { DialogConfirmationDialog } from './bookmarks/bookmarks.component';
import { ProfileComponent } from './profile/profile.component';
import {
    MatSlideToggleModule,
    MatProgressSpinnerModule,
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
    MatDialogModule
} from '@angular/material';
import { ComponentsModule } from './shared/components.module';
// import { SemanticSearchComponent } from './semantic-search/semantic-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SearchModule,
        AppRoutingModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
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
        MatExpansionModule
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
        DialogConfirmationDialog
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
        McssrService
    ],
    entryComponents: [RegistrationRepositoryComponent, DialogRegistrationRepository, DialogRegistrationDialog, DialogConfirmationDialog],
    bootstrap: [AppComponent]
})

export class AppModule { }
