import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SearchFormComponent } from './search/search-form.component';
import { AuthGuard } from './_guards/index';
import { SettingComponent } from './setting/index';
import { BookmarksComponent } from './bookmarks/index';
import { SearchHistoryComponent } from './search-history/index';
import { DialogRepositoryComponent } from './dialog-repository/index';
import { HashLocationStrategy, Location, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ProfileComponent } from './profile/index';
const appRoutes: Routes = [
    /*{ path: '',
    component: SearchFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'home' }
     children: [
    { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
    {
    path: 'bookmarks',
    component: BookmarksComponent,
    data: { breadcrumb: 'bookmarks' }
    },
    {
    path: 'setting',
    component: SettingComponent,
    data: { breadcrumb: 'setting' }
    }
    ]
    },*/
    { path: 'home', component: SearchFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'home' } },
    { path: 'login', component: LoginComponent, data: { breadcrumb: 'login' } },
    { path: 'register', component: RegisterComponent, data: { breadcrumb: 'register' } },
    { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], data: { breadcrumb: 'setting' } },
    { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard], data: { breadcrumb: 'bookmarks' } },
    { path: 'search-history', component: SearchHistoryComponent, canActivate: [AuthGuard], data: { breadcrumb: 'search history' } },
    { path: 'setting-rep', component: DialogRepositoryComponent, canActivate: [AuthGuard], data: { breadcrumb: 'setting repository' } },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { breadcrumb: 'profile' } },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/' } // <--- this right here
    ]
})

export class AppRoutingModule { }