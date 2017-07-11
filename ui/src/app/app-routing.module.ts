import { Routes, RouterModule } from "@angular/router"
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HomeComponent } from "./home/index"
import { LoginComponent } from "./login/index"
import { RegisterComponent } from "./register/index"
import { SearchFormComponent} from "./search/search-form.component"
import { AuthGuard } from "./_guards/index"
import { SettingComponent } from "./setting/index"
import { BookmarksComponent } from "./bookmarks/index"
import { SearchHistoryComponent } from "./search-history/index"
import { DialogRepositoryComponent } from "./dialog-repository/index"

const appRoutes: Routes = [
    { path: "", component: SearchFormComponent,
   /* children: [
     {
        path: "bookmarks",
        component: BookmarksComponent,
        data: {
          breadcrumb: "bookmarks"
        }
      },
       {
        path: "setting",
        component: SettingComponent,
        data: {
          breadcrumb: "setting"
        }
      }

    ], */
     canActivate: [AuthGuard], data: { breadcrumb: 'home' }},
    { path: "login", component: LoginComponent , data: { breadcrumb: 'login' }},
    { path: "register", component: RegisterComponent, data: { breadcrumb: 'register' }},
    { path: "setting", component: SettingComponent , data: { breadcrumb: 'setting' }},
    { path: "bookmarks", component: BookmarksComponent , data: { breadcrumb: 'bookmarks' }},
    { path: "search-history", component: SearchHistoryComponent , data: { breadcrumb: 'search history' }},
    { path: "setting-rep", component: DialogRepositoryComponent , data: { breadcrumb: 'setting repository' }},

    // otherwise redirect to home
    { path: "**", redirectTo: "" }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}