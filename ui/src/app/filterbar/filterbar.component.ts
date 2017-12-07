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

  setSidebar() {
    this.showSidebar = !this.showSidebar;
    this.toggle.emit(this.showSidebar);
  }

  selectRep() {
    const checked = this.activeRepositories.filter(obj => obj.enabled === true).length === this.activeRepositories.length;
    this.activeRepositories.forEach(function (element) {
      element.enabled = !checked;
    });
  }

  selectType() {
    const checked = this.activeType.filter(obj => obj.enabled === true).length === this.activeType.length;
    this.activeType.forEach(function (element) {
      element.enabled = !checked;
    });
  }

  isAllSelected(filter: Filter[]): boolean {
    return filter.filter(obj => obj.enabled === true).length === filter.length;
  }


}


