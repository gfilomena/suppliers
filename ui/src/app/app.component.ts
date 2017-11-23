import { Component } from '@angular/core';
import { User } from './_models/user';
import {AuthService} from './_services/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    // currentUser: User

    constructor(public auth: AuthService) {
        // this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        auth.handleAuthentication();
    }
}
