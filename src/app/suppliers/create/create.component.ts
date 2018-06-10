import { Component, OnInit, OnChanges, SimpleChanges, Input, ViewEncapsulation  } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery/dist/jquery';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class CreateComponent implements OnChanges, OnInit  {

  grouplist: any = [
    {_id: 1, name: 'Cleaners', enabled: false },
    {_id: 2, name: 'Office supply (paper, envelopes, etc)', enabled: false },
    {_id: 3, name: 'Telephone service', enabled: false },
    {_id: 4, name: 'Security', enabled: false }
  ];

  countries: any = [
    {id: 'au', code: '+21', name: 'Australia'},
    {id: 'es', code: '+22', name: 'Spain'},
    {id: 'gb', code: '+13', name: 'UK'},
    {id: 'za', code: '+27', name: 'South Africa'},
    {id: 'zm', code: '+23', name: 'Zambia'},
    {id: 'jp', code: '+81', name: 'Japan'}
  ];

  prefix = this.countries[0].code;
  private items: Array<any> = [];
  selectedCountry = this.countries[0].id;
  groups: Array<Number> = [];
  title = 'Add Supplier';
  angForm: FormGroup;


  constructor(private supplierservice: SupplierService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.createForm();
   }

   public ngOnInit(): any {

   $(document).ready(function() {

     console.log('jquery ready!');

   });

  }

   createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ]
   });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes', changes);
  }

  setCountry(value) {
    console.log('setCountry value', value);
  }

  setFlag(country) {
    this.selectedCountry = country.id;
    this.prefix = country.code;
    console.log('this.prefix',   this.prefix);
    console.log(' this.selectedCountry',    this.selectedCountry);
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
    console.log('groups', groups);
    console.log('prefix', prefix);

      this.supplierservice.addSupplier(name, address, email, prefix, phone, groups).subscribe(
				data => {
          console.log('Added', data);
					this.router.navigate(['index']);
				},
				error => {
					console.log('error', error);
				});
  }

}