import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"

import { SearchForm }    from '../_models/search-form';
import { User } from "../_models/user";
import { SearchService } from "./search.service";
import { MultimediaContent } from "../_models/multimediaContent";

@Component({
  selector: 'app-search-form',
  providers: [SearchService],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
    submitted = false;
    currentUser: User;
    types = ['Audio', 'Video', 'Text', 'Image'];
    searchForm: SearchForm;
    searchResults: MultimediaContent[]=[];

    constructor(private searchService: SearchService, private router: Router){
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
        this.searchForm=new SearchForm('1','2','3',new Date(),new Date(),'6','7')
    }

    onSubmit() {

        this.submitted = true;
        //console.log(JSON.stringify(this.searchForm))
        localStorage.setItem("searchForm", JSON.stringify(this.searchForm))
        this.router.navigate(["/search"])
}
    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.searchForm); }
}
