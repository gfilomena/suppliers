import { Routes, RouterModule } from "@angular/router"
import { NgModule }             from '@angular/core';

import { HomeComponent } from "./home/index"
import { LoginComponent } from "./login/index"
import { RegisterComponent } from "./register/index"
import { SearchFormComponent} from "./search/search-form.component"
import { AuthGuard } from "./_guards/index"
import { SettingComponent } from "./setting/index"
import { BookmarksComponent } from "./bookmarks/index"
import { SearchHistoryComponent } from "./search-history/index"

const appRoutes: Routes = [
    { path: "", component: SearchFormComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "setting", component: SettingComponent },
    { path: "bookmarks", component: BookmarksComponent },
    { path: "search-history", component: SearchHistoryComponent },

    // otherwise redirect to home
    { path: "**", redirectTo: "" }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}