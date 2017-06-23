import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { SearchFormComponent }    from './search-form.component';
import { SearchResultComponent }  from './search-result.component';
import { SearchService } from './search.service';
import { SearchRoutingModule } from './search-routing.module';
import { MultimediaContentComponent } from '../multimedia-content/multimedia-content.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NoopAnimationsModule} from "@angular/platform-browser/animations"
import "hammerjs";
import { MaterialModule, MdMenuModule , MdButtonModule, MdIconModule, MdTabsModule, MdInputModule, MdSelectModule, MdDatepickerModule,  MdNativeDateModule, DateAdapter, MdDateFormats } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule
  ],
  declarations: [
    SearchFormComponent,
    SearchResultComponent,
    MultimediaContentComponent
  ],
  providers: [ SearchService ]
})
export class SearchModule {}
