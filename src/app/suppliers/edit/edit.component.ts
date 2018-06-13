import { Component, OnInit, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from '../../supplier.service';
import { Supplier } from '../index/Supplier';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

	grouplist: any = [
		{ _id: 1, name: 'Cleaners', enabled: false },
		{ _id: 2, name: 'Office supply (paper, envelopes, etc)', enabled: false },
		{ _id: 3, name: 'Telephone service', enabled: false },
		{ _id: 4, name: 'Security', enabled: false }
	];

	countries: any = [
		{ id: 'au', code: '+21', name: 'Australia' },
		{ id: 'es', code: '+22', name: 'Spain' },
		{ id: 'gb', code: '+13', name: 'UK' },
		{ id: 'za', code: '+27', name: 'South Africa' },
		{ id: 'zm', code: '+23', name: 'Zambia' },
		{ id: 'jp', code: '+81', name: 'Japan' }
	];

	groups: Array<Number> = [];
	supplier: any = {};
	angForm: FormGroup;
	prefix;
	phone;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private service: SupplierService,
		private fb: FormBuilder) {
		this.createForm();
	}

	checkvalue(_id) {
		const index = this.supplier.groups.findIndex(item => item._id === _id);
		if (index !== -1) {
			return true;
		}
		return false;
	}

	setphone(phone) {
		this.phone = phone;
		console.log('edit - setphone this.phone', this.phone);
	}

	setprefix(prefix) {
		this.prefix = prefix;
		console.log('edit - setprefix prefix', this.prefix);
	}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			email: ['', Validators.required],
		});
	}

	setGroups() {
		this.supplier.groups.forEach(id => {
			// Retrieve item and assign ref to updatedItem
			const updatedItem = this.grouplist.find((element) => element._id === id);

			// Modify object property
			updatedItem.enabled = true;
		});
	}

	getGroups() {
		let filtered: Array<Number> = [];
		console.log(' this.grouplist', this.grouplist);
		this.grouplist.forEach(o => {
			if (o.enabled) { filtered.push(o._id); }
		});
		console.log('filtered', filtered);
		return filtered;
	}

	updateSupplier(name, address, email, prefix, phone) {
		const groups = this.getGroups();
		this.route.params.subscribe(params => {
			this.service.updateSupplier(name, address, email, prefix, phone, groups, params['id']).subscribe(
				data => {
					this.router.navigate(['']);
				},
				error => {
					console.log('error', error);
				});
		});
	}

	getidbyprefix(prefix) {
		const index = this.countries.findIndex(item => item.code === prefix);
		if (index !== -1) {
			return this.countries[index].id;
		}
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.service.editSupplier(params['id']).subscribe(res => {
				this.supplier = res;
				this.angForm.get('name').setValue(this.supplier.name);
				this.angForm.get('address').setValue(this.supplier.address);
				this.angForm.get('email').setValue(this.supplier.email);
				this.setGroups();
				this.setprefix(this.supplier.prefix);
				this.setphone(this.supplier.phone);
			});

		});

	}

}
