import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SearchFormComponent }    from './search-form.component';
import { SearchResultComponent }  from './search-result.component';
import { SearchService } from './search.service';
import { SearchRoutingModule } from './search-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    SearchFormComponent,
    SearchResultComponent
  ],
  providers: [ SearchService ]
})
export class SearchModule {}
