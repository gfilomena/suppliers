import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../_models/filter';


@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent {

  @Input() activeType: Filter[];
  @Input() activeRepositories: Filter[];
  @Input() showSidebar: boolean;
  @Output() toggle = new EventEmitter<boolean>();



  constructor() {

   }

setSidebar(){
  this.showSidebar = !this.showSidebar;
  this.toggle.emit(this.showSidebar);
}


}


