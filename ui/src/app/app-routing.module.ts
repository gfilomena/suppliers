﻿import { Routes, RouterModule } from "@angular/router"
import { NgModule }             from '@angular/core';

import { HomeComponent } from "./home/index"
import { LoginComponent } from "./login/index"
import { RegisterComponent } from "./register/index"
import { SearchFormComponent} from "./search/search-form.component"
import { AuthGuard } from "./_guards/index"

const appRoutes: Routes = [
    { path: "", component: SearchFormComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },

    // otherwise redirect to home
    { path: "**", redirectTo: "" }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}