import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from "../_services/index";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    api:string;
    user:string;

  constructor( public http: Http, public auth:AuthService) {
  }

  ngOnInit() {
      this.api = localStorage.getItem('serviceUrl');
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if(user) {
        this.user = user.username;
      }else{
        this.user = 'Anonymus';
      }
     
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
      let user = JSON.parse(localStorage.getItem('currentUser'));
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
