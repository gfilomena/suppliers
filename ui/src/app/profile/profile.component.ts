import { Component, OnInit } from '@angular/core';
import { Repository } from '../_models/repository';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

repositories:Repository[];


  constructor() { }

  ngOnInit() {
  }

}
