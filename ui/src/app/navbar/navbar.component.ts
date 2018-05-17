import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../_services/index';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

    api: string;
    currentUser: any;
    username: string;

  constructor( public http: Http, public auth: AuthService) {
  }

  ngOnInit() {
      this.api = localStorage.getItem('serviceUrl');

  }




  isLoggedIn() {
    if(this.auth.isAuthenticated()){
        // console.log('nav bar authenticated');
        return true;
    }
    else{
        // console.log('nav bar not authenticated');
      return false;
    }
  }

  getLoggedUser() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.username) {
          return user.username;
      }
  }

  logout(){
      this.auth.logout();
  }

}
