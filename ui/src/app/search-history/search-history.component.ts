import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorysearchService } from "../_services/historysearch.service";
import { User } from "../_models/user";
import { SearchForm } from '../_models/search-form';
import { SearchResult } from '../_models/search-result';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchResult: any[];
  currentUser: User;
  nResults: number;
  loading: Boolean = false;
  dates: Date[];
  resultsByDate: any[][] = [[]];

  // init param smd-fab-speed-dial
  open: boolean = false;
  fixed: boolean = false;
  spin: boolean = false;
  direction: string = 'up';
  animationMode: string = 'fling';

  selected: Selected[] = [];
  selectAll = false;

  constructor(
    private historysearchService: HistorysearchService,
    public router: Router,
    public http: Http,
    public route: ActivatedRoute,
    private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnInit() {
    this.getHistoryResults()
  }

  getHistoryResults() {
    this.loading = true;
    this.historysearchService.getSearchResults(this.currentUser.username)
      .subscribe(
      res => {
        console.log('get all history - subscribe OK:', res);
        this.searchResult = this.arrToString(res.reverse());
        this.initCheckbox();
        this.nResults = this.searchResult.length;
        // for (let sr of this.searchResult) sr['checked'] = false;    NOT USED
        this.dates = this.retrieveDates(this.searchResult);
        console.log('this.searchResult', this.searchResult);

      },
      error => {
        console.log('get all history - subscribe - error:', error);
        this.loading = false;
      });
  }


  initCheckbox() {
    this.selected = [];
    for (let i = 0; i < this.searchResult.length; i++) {
      const item: Selected = { id: this.searchResult[i].id, checked: false, date: this.searchResult[i].date };
      this.selected.push(item);
    }
    // console.log("this.selected",this.selected);
  }

  enableDelete(): boolean {
    // show the delete button
    // console.log("enableDelete()", this.selected.find(obj => obj.checked === true));
    if (this.selected.findIndex(obj => obj.checked === true) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  selecTo(choose: boolean) {
    this.selected.forEach(function (element) {
      element.checked = choose;
    });
  }

  getCheckboxValue(id: string): boolean {
    return this.selected.find(obj => obj.id === id).checked;
  }

  setCheckbox(id: string) {
    const index = this.selected.findIndex(obj => obj.id === id);
    if (index !== -1) {
      this.selected[index].checked = !this.selected[index].checked;
    }
  }

  getSelectedCount(): string {
    const count = this.selected.filter(item => item.checked === true).length;
    if (count === 1) {
      return '1 item selected';
    } else {
      return count + ' items selected';
    }
  }


  deleteSelected() {
    const dialogc = this.dialog.open(HistoryConfirmationDialog, {
      data: { message: this.getSelectedCount() },
      height: 'auto'
    });

    dialogc.afterClosed().subscribe(confirm => {
      if (confirm) {

        let deleteList = '';
        const checked = this.selected.filter(item => item.checked === true);
        checked.forEach(function (i, idx, array) {
          deleteList += array[idx].id;
          if (idx < array.length - 1) {
            deleteList += ',';
          }
        });

        //console.log('deleteList:', deleteList);

        this.historysearchService.delete(this.currentUser.username, deleteList)
          .subscribe(
          data => {
            checked.forEach(element => {
              // delete selected
              const i = this.selected.findIndex(obj => obj.id === element.id);
              this.selected.splice(i, 1);
              // delete in histories
              this.resultsByDate.forEach(items => {
                const j = items.findIndex(obj => obj.id === element.id);
                if (j !== -1) {
                  items.splice(j, 1);
                }
              });
              console.log('this.resultsByDate', this.resultsByDate);
              console.log(' this.dates', this.dates);
            });
            // delete date not used
            let deletedatelist: Date[] = [];
            for (let i = 0; i < this.dates.length; i++) {

              let found = false;
              // search result with current date
             // for (let j = 0; j < this.resultsByDate.length; j++) {
              let j = 0;
              while(j < this.resultsByDate.length && !found)  {
                console.log('this.dates[i] '+i, this.dates[i]);
                    for (let k = 0; k < this.resultsByDate[j].length; k++) {
                      console.log('new Date this.resultsByDate['+j+']['+k+'][date]',new Date(this.resultsByDate[j][k]['date']));
                      console.log('new Date(this.dates[i])'+i, new Date(this.dates[i]));

                          if(  sameDay(new Date(this.resultsByDate[j][k]['date']), new Date(this.dates[i]))) {
                            console.log('sameDay in - this.resultsByDate[j][date]', this.resultsByDate[j][k]['date']);
                            found = true;
                            break;
                          }
                    }
                    j++;
              }
              // if not find anydate in the search results, delete the date.
              if(!found) {
                deletedatelist.push(this.dates[i]);
              }
            }
            for (let i = 0; i < deletedatelist.length; i++) {
              const index = this.dates.findIndex(obj => obj === deletedatelist[i]);
              if(index !== -1) {
                this.dates.splice(index, 1);
              }
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }


  /*
    deleteAll() {
      this.loading = true;
      this.historysearchService.deleteAll(this.currentUser.username)
        .subscribe(
        res => {
          console.log('delete all history - subscribe OK:', res);
          this.searchResult.splice(0, this.searchResult.length);
          this.nResults = this.searchResult.length;
          this.loading = false;
        },
        error => {
          console.log('delete all history - subscribe - error:', error);
          this.loading = false;
        });
    }
  */
  arrToString(array: any[]) {
    let i: number;
    for (i = 0; i < array.length; i++) {
      array[i].freeText = array[i].freeText.join(' ');
    }
    return array;
  }

  goToSearchForm(searchForm: SearchForm) {
    console.log(searchForm);

    this.searchResult = [];

    this.router.navigate(['/home'], { queryParams: { keywords: searchForm.freeText, inDate: searchForm.inDate, endDate: searchForm.endDate } });
  }

  public getTime(isoDate: string): string {
    let date: Date = new Date(isoDate);
    return ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
  }


  private retrieveDates(searchResult: any[]): Date[] {

    if (searchResult.length > 0) {

      let distinctDates: Date[] = [];
      let currentDate: Date = new Date(searchResult[0]['date']);
      distinctDates.push(currentDate);
      let dateIndex = 0;
     // this.resultsByDate.push([]);

      for (let sr of searchResult) {
        let srDate: Date = new Date(sr['date']);
        if (srDate.getFullYear() != currentDate.getFullYear() ||
          srDate.getMonth() != currentDate.getMonth() ||
          srDate.getDate() != currentDate.getDate()) {
          distinctDates.push(srDate);
          currentDate = srDate;
          this.resultsByDate.push([]);
          dateIndex++;
        }
        this.resultsByDate[dateIndex].push(sr);
      }
      console.log('this.resultsByDate', this.resultsByDate);
      return distinctDates;

    }

    return null;

  }

}


export interface Selected {
  id: string;
  date: Date;
  checked: boolean;
}

@Component({
  selector: 'dialog-confirmation-dialog',
  templateUrl: 'dialog-confirmation-dialog.html',
})
export class HistoryConfirmationDialog {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}

function sameDay(d1, d2): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

