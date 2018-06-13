import { Component, OnInit } from '@angular/core';
import { Supplier } from './Supplier';
import { SupplierService } from '../../supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  suppliers: Supplier[];
  origin: Supplier[];
  inputsearch: string;

  grouplist: any = [
    {_id: 1, name: 'Cleaners', enabled: false },
    {_id: 2, name: 'Office supply (paper, envelopes, etc)', enabled: false },
    {_id: 3, name: 'Telephone service', enabled: false },
    {_id: 4, name: 'Security', enabled: false }
  ];

  constructor(private supplierservice: SupplierService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }
  deleteSupplier(id) {
    this.supplierservice.deleteSupplier(id)
      .subscribe(
        data => {
          console.log('Deleted', data);
          this.getAll();
        },
        error => {
          console.log('error', error);
        });
  }

  getNameGroup(id) {
    const group = this.grouplist.find(item => item._id === id);
    return group.name;
  }

  getbyGroup($event) {
    console.log(' $event', $event);
    const id = parseInt($event.target.value);

   if (id === -1) {
    this.suppliers = this.origin;
   } else {

      let tmp: any = [];
      this.origin.forEach(item => {
        if (item.groups.includes(id)) {
          tmp.push(item);
          console.log("YES item", item);
        }
      });

      this.suppliers = tmp;
   }
    console.log('this.suppliers', this.suppliers);
  }

  onKeydown(event) {
    console.log(' event', event);
    if (event.key === 'Enter') {
      console.log(event);
      this.searchbyName();
    }
  }

  searchbyName() {
    this.suppliers = this.origin.filter(item => item.name.search(this.inputsearch) > -1);
  }

  getAll() {

    this.supplierservice
    .getSuppliers()
    .subscribe((data: Supplier[]) => {
      this.suppliers = data;
      this.origin = data;
      console.log('this.suppliers', this.suppliers);
    });

  }

}
