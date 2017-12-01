import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorysearchService } from "../_services/historysearch.service";
import { User } from "../_models/user";
import { SearchForm } from '../_models/search-form';
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

  //init param smd-fab-speed-dial
  open: boolean = false;
  fixed: boolean = false;
  spin: boolean = false;
  direction: string = 'up';
  animationMode: string = 'fling';

  // _click(event: any) {
  //    console.log(event);
  // }

  constructor(private historysearchService: HistorysearchService, public router: Router, public http: Http, public route: ActivatedRoute) {
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
        this.nResults = this.searchResult.length;
        this.dates = this.retrieveDates(this.searchResult);
        console.log('this.searchResult', this.searchResult)
      },
      error => {
        console.log('get all history - subscribe - error:', error);
        this.loading = false;
      }
      )
  }

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
      }
      )
  }

  arrToString(array: any[]) {
    let i: number;
    for (i = 0; i < array.length; i++) {
      array[i].freeText = array[i].freeText.join(" ")
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
      for (let sr of searchResult) {
        let srDate: Date = new Date(sr['date']);
        if (srDate.getFullYear() != currentDate.getFullYear() ||
          srDate.getMonth() != currentDate.getMonth() ||
          srDate.getDate() != currentDate.getDate()) {
          distinctDates.push(srDate);
          currentDate = srDate;
        }
      }
      console.log("distinct dates: " + distinctDates);
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
        date.getMonth()    == today.getMonth()    &&
        date.getDate()     == today.getDate())
      dateString += "Today - ";

    return dateString + days[date.getDay()]     + ', '
                      + date.getDate()          + ' '
                      + months[date.getMonth()] + ' '
                      + date.getFullYear();
  }

}
