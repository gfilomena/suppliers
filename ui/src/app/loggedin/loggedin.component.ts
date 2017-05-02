import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

    api:string;

    constructor(public router: Router, public http: Http, public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.api = localStorage.getItem('serviceUrl');
    }


    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }

    getLoggedUser() {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user && user.firstName) {
            return user.firstName;
        }
        return 'Anonymus';
    }

    logout(event) {
        event.preventDefault();

    }

}
