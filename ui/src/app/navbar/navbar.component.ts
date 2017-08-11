import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    api:string;

  constructor( public http: Http) {
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

  checkPage(){
      let url = window.location.href;
      if (url.indexOf('login')!== -1 )  {
          return false;
      }
      return true;


  }

}
