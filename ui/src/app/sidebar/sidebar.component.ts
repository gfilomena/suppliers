import { Component, OnInit } from '@angular/core';
  import { Http } from '@angular/http';
  import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
  import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


  @Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
  })
  export class SidebarComponent implements OnInit {


    constructor(private router: Router, public http: Http, public route: ActivatedRoute) {


  }

    ngOnInit(){
    }

    isLoggedIn() {
      if (localStorage.getItem('currentUser')) {
          return true;
      }
      return false;
  }

  }
