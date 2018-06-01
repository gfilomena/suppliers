import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../_services/index';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

    profile: any;

  constructor( public http: Http, public auth: AuthService) {
  }

  ngOnInit() {
  }

  getPicture() {

    if(this.profile && this.profile.picture) {
        return this.profile.picture;
    }else{
        return "/assets/images/account.png";
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
      this.profile = JSON.parse(localStorage.getItem('auth0_profile'));
      if (this.profile && this.profile.nickname) {
          return this.profile.nickname;
      }
  }

  logout(){
      this.auth.logout();
  }

}
