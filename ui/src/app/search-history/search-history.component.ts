import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorysearchService } from "../_services/historysearch.service";
import { User } from "../_models/user";
import { SearchForm } from '../_models/search-form';
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
      const item: Selected = { id: this.searchResult[i].id, checked: false };
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
            console.log('data', data);
            checked.forEach(element => {
              // delete selected
              const i = this.selected.findIndex(obj => obj.id === element.id);
              this.selected.splice(i, 1);
              // delete in histories
              this.resultsByDate.forEach(items => {
                const j = items.findIndex(obj => obj.id === element.id);
                items.splice(j, 1);
              });
            });
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
    return array
  }

  goToSearchForm(searchForm: SearchForm) {
    console.log(searchForm);
    localStorage.removeItem("lastresearch");
    this.searchResult = [];
    localStorage.setItem("searchForm", JSON.stringify(searchForm));
    this.router.navigate(['/']);
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
      this.resultsByDate.push([]);

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
      return distinctDates;

    }

    return null;

  }



  formatDate(date: Date): string {

    let dateString: string = "";

    let months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let days: string[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    let today: Date = new Date(Date.now());
    if (date.getFullYear() == today.getFullYear() &&
      date.getMonth() == today.getMonth() &&
      date.getDate() == today.getDate())
      dateString += "Today - ";

    return dateString + days[date.getDay()] + ', '
      + date.getDate() + ' '
      + months[date.getMonth()] + ' '
      + date.getFullYear();
  }

}

export interface Selected {
  id: string;
  checked: boolean;
}

@Component({
  selector: 'dialog-confirmation-dialog',
  templateUrl: 'dialog-confirmation-dialog.html',
})
export class HistoryConfirmationDialog {
  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}
