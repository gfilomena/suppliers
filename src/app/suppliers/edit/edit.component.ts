import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { Supplier } from '../index/Supplier';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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


	supplier: any = {};
	angForm: FormGroup;
	constructor(private route: ActivatedRoute,
		private router: Router,
		private service: SupplierService,
		private fb: FormBuilder) {
		this.createForm();
	}

	checkvalue(_id) {
		const index = this.supplier.groups.findIndex(item => item._id === _id);
		if(index !== -1) {
			return true;
		}
		return false;
	}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required]
		});
	}

	setGroups() {
		this.supplier.groups.forEach(id => {
			// Retrieve item and assign ref to updatedItem
			let updatedItem = this.grouplist.find((element) => { return element._id === id })

			// Modify object property
			updatedItem.enabled = true;
		});
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

	updateSupplier(name, address, email, phone) {
		const groups = this.getGroups();
		console.log('groups', groups);
		this.route.params.subscribe(params => {
			this.service.updateSupplier(name, address, email, phone, groups, params['id']).subscribe(
				data => {
					this.router.navigate(['index']);
				},
				error => {
					console.log('error', error);
				});
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.service.editSupplier(params['id']).subscribe(res => {
				this.supplier = res;
				this.angForm.get('name').setValue(this.supplier.name);
				this.angForm.get('address').setValue(this.supplier.address);
				this.angForm.get('email').setValue(this.supplier.email);
				this.angForm.get('phone').setValue(this.supplier.phone);
				this.setGroups();
			});
			
		});

	}

}
