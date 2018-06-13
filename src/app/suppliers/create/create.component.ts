import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPipe } from '../filters/filter.pipe';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class CreateComponent {

  grouplist: any = [
    {_id: 1, name: 'Cleaners', enabled: false },
    {_id: 2, name: 'Office supply (paper, envelopes, etc)', enabled: false },
    {_id: 3, name: 'Telephone service', enabled: false },
    {_id: 4, name: 'Security', enabled: false }
  ];



  prefix;
  phone;
  searchText = '';
  groups: Array<Number> = [];
  title = 'Add Supplier';
  angForm: FormGroup;


  constructor(private supplierservice: SupplierService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.createForm();
   }

   createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ]
   });
  }

  setphone(phone) {
    this.phone = phone;
    console.log('setphone event', event);
  }

  setprefix(prefix) {
    this.prefix = prefix;
    console.log('setprefix event', event);
  }

  setCountry(value) {
    console.log('setCountry value', value);
  }

  getGroups() {
  let filtered: Array<Number> = [];
  console.log(' this.grouplist',  this.grouplist);
  this.grouplist.forEach(o => {
    if (o.enabled) {  filtered.push(o._id); }
   });
   console.log('filtered', filtered);
   return filtered;
  }

  addSupplier(name, address, email, prefix, phone) {
    const groups = this.getGroups();
    // console.log('groups', groups);
    console.log('addSupplier prefix', prefix);
    console.log('addSupplier phone', phone);

      this.supplierservice.addSupplier(name, address, email, prefix, phone, groups).subscribe(
				data => {
          console.log('Added', data);
					this.router.navigate(['']);
				},
				error => {
					console.log('error', error);
				});
  }

}