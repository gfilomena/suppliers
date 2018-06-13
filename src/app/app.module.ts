import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateComponent } from './suppliers/create/create.component';
import { EditComponent } from './suppliers/edit/edit.component';
import { IndexComponent } from './suppliers/index/index.component';

import { SupplierService } from './supplier.service';
import { FilterPipe } from './suppliers/filters/filter.pipe';
import { PhoneComponent } from './phone/phone.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    IndexComponent,
    FilterPipe,
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ SupplierService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
