import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SearchFormComponent } from './search/search-form.component';
import { AuthGuard } from './_guards/index';
import { SettingComponent } from './profile/setting/index';
import { BookmarksComponent } from './bookmarks/index';
import { SearchHistoryComponent } from './search-history/index';
import { DialogRepositoryComponent } from './dialog-repository/index';
import { HashLocationStrategy, PathLocationStrategy, Location, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ProfileComponent } from './profile/index';
import {CallbackComponent} from './callback/index';
const appRoutes: Routes = [
    { path: 'home', component: SearchFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'home' } },
    { path: 'login', component: LoginComponent, data: { breadcrumb: 'login' } },
    { path: 'register', component: RegisterComponent, data: { breadcrumb: 'register' } },
    { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard], data: { breadcrumb: 'bookmarks' } },
    { path: 'search-history', component: SearchHistoryComponent, canActivate: [AuthGuard], data: { breadcrumb: 'search history' } },
    { path: 'setting-rep', component: DialogRepositoryComponent, canActivate: [AuthGuard], data: { breadcrumb: 'setting repository' } },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { breadcrumb: 'profile' } },
    { path: 'callback', component: CallbackComponent, data: {breadcrumb: 'callback' } },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
})

export class AppRoutingModule { }