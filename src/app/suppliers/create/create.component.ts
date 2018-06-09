import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnChanges {

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
      email: ['', Validators.required ],
      phone: ['', Validators.required ]
   });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes', changes);
  }

  change(event) {

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

  addSupplier(name, address, email, telephone) {
    const groups = this.getGroups();
    console.log('groups', groups);

      this.supplierservice.addSupplier(name, address, email, telephone, groups).subscribe(
				data => {
          console.log('Added', data);
					this.router.navigate(['index']);
				},
				error => {
					console.log('error', error);
				});
  }

}