import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from "@angular/router"
import { SearchResult }    from '../_models/search-result';
import { SearchForm } from '../_models/search-form';
import { User } from "../_models/user";
import { MultimediaContent } from "../_models/multimediaContent";
import { SearchService } from "./search.service";

@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{
    currentUser: User;
    searchResult: MultimediaContent[];
    searchForm: SearchForm;

    constructor(private searchService: SearchService, private router: ActivatedRoute){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        this.searchForm = JSON.parse(localStorage.getItem("searchForm"));
        console.log('Inside constructor'+JSON.stringify(this.searchForm));
    }

    ngOnInit() {
        this.searchService.search(this.searchForm)
        .subscribe(
                res => {
                    //console.log(JSON.stringify(res.json().multimediaContents));
                    this.searchResult=res.json().multimediaContents;
                    //console.log(this.searchResult);

                },
                error => {
                    console.log(error);
                    //this.loading = false
                }
                )
}
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.searchResult); }
}
