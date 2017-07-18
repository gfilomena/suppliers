import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"
import { HttpModule } from "@angular/http"
import { AppRoutingModule } from "./app-routing.module"
import { SearchModule } from "./search/search.module"

import { AppComponent } from "./app.component"
import { AppConfig } from "./app.config"

import { AlertComponent } from "./_directives/index"
import { AuthGuard } from "./_guards/index"
import { AlertService, AuthenticationService, UserService, RepositoryService, UserRepositoryService, BookmarkService, HistorysearchService /*PagerService*/ } from "./_services/index"
import { HomeComponent } from "./home/index"
import { LoginComponent } from "./login/index"
import { RegisterComponent } from "./register/index"
import { SidebarComponent } from "./sidebar/index"
import { NavbarComponent } from "./navbar/index"
import { LoggedinComponent } from "./loggedin/index"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import "hammerjs"
import { MaterialModule,  MdNativeDateModule} from "@angular/material"
import { FlexLayoutModule } from "@angular/flex-layout"
import { SettingComponent } from './setting/setting.component'
import { SearchHistoryComponent } from './search-history/search-history.component'
import { BreadcrumbComponent } from './navbar/breadcrumb/breadcrumb.component';
import { DialogRegistrationRepository, RegistrationRepositoryComponent } from './setting/registration-repository/registration-repository.component';




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SearchModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MaterialModule,
        MdNativeDateModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SidebarComponent,
        NavbarComponent,
        LoggedinComponent,
        SettingComponent,
        SearchHistoryComponent,
        BreadcrumbComponent,
        DialogRegistrationRepository,
        RegistrationRepositoryComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RepositoryService,
        UserRepositoryService,
        BookmarkService,
        HistorysearchService
        //PagerService
    ],
    entryComponents: [RegistrationRepositoryComponent,DialogRegistrationRepository],  
    bootstrap: [AppComponent]
})

export class AppModule {}
