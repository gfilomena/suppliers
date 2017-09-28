import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MultimediaContent } from "../_models/multimediaContent";
import { HistorysearchService } from "../_services/historysearch.service";
import { User } from "../_models/user";
import { SearchForm } from '../_models/search-form';
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchResult: any[]
  currentUser: User
  nResults: number
  loading: Boolean = false;

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
        console.log('get all history - subscribe OK:', res)
        this.searchResult = this.arrToString(res.reverse())
        this.nResults = this.searchResult.length;
        console.log('this.searchResult', this.searchResult)
        this.loading = false;
      },
      error => {
        console.log('get all history - subscribe - error:', error)
        this.loading = false;
      }
      )
  }

  deleteAll() {
    this.loading = true;
    this.historysearchService.deleteAll(this.currentUser.username)
      .subscribe(
      res => {
        console.log('delete all history - subscribe OK:', res)
        this.searchResult.splice(0, this.searchResult.length)
        this.nResults = this.searchResult.length;
        this.loading = false;
      },
      error => {
        console.log('delete all history - subscribe - error:', error)
        this.loading = false;
      }
      )
  }

  arrToString(array: any[]) {
    var i: number
    for (i = 0; i < array.length; i++) {
      array[i].freeText = array[i].freeText.join(" ")
    }
    return array
  }

  goToSearchForm(searchForm: SearchForm) {
    console.log(searchForm)
    localStorage.removeItem("lastresearch");
    this.searchResult = [];
    localStorage.setItem("searchForm", JSON.stringify(searchForm));
    this.router.navigate(['/']);
  }


  isoDateToHtmlDate(isoDate) {
    let date = new Date(isoDate);
    let years = date.getFullYear()
    let dtString = ''
    let monthString = ''
    let hourString = date.getHours()
    let minString = date.getMinutes()
    let secString = date.getSeconds()
    if (date.getDate() < 10) {
      dtString = '0' + date.getDate();
    } else {
      dtString = String(date.getDate())
    }
    if (date.getMonth() + 1 < 10) {
      monthString = '0' + Number(date.getMonth() + 1);
    } else {
      monthString = String(date.getMonth() + 1);
    }


    return years + '-' + monthString + '-' + dtString + ' ' + hourString + ':' + minString + ':' + secString;
  }

}
