import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SupplierService {

	uri: String = 'http://localhost:4000/suppliers';

	constructor(private http: HttpClient) { }

	addSupplier(name, address, email, prefix, phone, groups) {
		const obj = {
			name: name,
			address: address,
			email: email,
			prefix: prefix,
			phone: phone,
			groups: groups
		};
		return this
			.http
			.post(`${this.uri}/add`, obj);

	}

	getSuppliers() {
		return this
			.http
			.get(`${this.uri}`);
	}

	editSupplier(id) {
		return this
			.http
			.get(`${this.uri}/edit/${id}`);
	}

	updateSupplier(name, address, email, prefix, phone, groups, id) {

		const obj = {
			name: name,
			address: address,
			email: email,
			prefix: prefix,
			phone: phone,
			groups: groups
		};
		return this
			.http
			.post(`${this.uri}/update/${id}`, obj);

	}

	deleteSupplier(id) {
		return this
			.http
			.get(`${this.uri}/delete/${id}`);
	}
}
