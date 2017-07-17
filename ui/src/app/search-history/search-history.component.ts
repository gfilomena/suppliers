import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MultimediaContent } from "../_models/multimediaContent";
import { HistorysearchService } from "../_services/historysearch.service";
import { User } from "../_models/user";
import { SearchForm }    from '../_models/search-form';
@Component({
  selector: 'app-search-history',
  providers: [HistorysearchService],
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {

  searchResult:any[]
  currentUser: User
  constructor(private  historysearchService:   HistorysearchService,public router: Router, public http: Http, public route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
   }

  ngOnInit() {
    this.getHistoryResults()
  }

  getHistoryResults(){

    this.historysearchService.getSearchResults(this.currentUser.username)
            .subscribe(
                      res => {
                          console.log('get all history - subscribe OK:',res)
                          this.searchResult=this.arrToString(res)
                          console.log('this.searchResult',this.searchResult)
                      },
                      error => {
                          console.log('get all history - subscribe - error:',error)
                      }
                    )
}
                  
arrToString(array:any[]) {
    var i:number
        for(i = 0;i<array.length;i++) { 
          array[i].keywords = array[i].keyWords.join(" ")
        }
    return array
}

goToSearchForm(searchForm: SearchForm) {
   console.log(searchForm)
    localStorage.setItem("searchForm", JSON.stringify(searchForm));
    this.router.navigate(['/']);
  }

}
