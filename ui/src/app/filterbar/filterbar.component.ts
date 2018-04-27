import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../_models/filter';
import { MultimediaContent } from '../_models/multimediaContent';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class FilterbarComponent {

  @Input() searchResult: MultimediaContent[];
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

  counter() {

    // reset counter
    this.activeType.forEach(obj => obj.count = 0);
    this.activeRepositories.forEach(obj => obj.count = 0);

    for (let i = 0; i < this.searchResult.length; i++) {

            const t = this.activeType.findIndex(obj => obj.name === this.searchResult[i].type && obj.enabled );
            const r = this.activeRepositories.findIndex(obj => obj.name === this.searchResult[i].source.name && obj.enabled );

        if(t != -1  && r != -1) {
             // increment type counter
         this.activeType[t].count = this.activeType[t].count + 1;

         // increment repository counter
         this.activeRepositories[r].count = this.activeRepositories[r].count + 1;
        }
    }

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


