import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit, OnChanges {

  countries: any = [
    { id: 'au', code: '+21', name: 'Australia' },
    { id: 'es', code: '+22', name: 'Spain' },
    { id: 'gb', code: '+13', name: 'UK' },
    { id: 'za', code: '+27', name: 'South Africa' },
    { id: 'zm', code: '+23', name: 'Zambia' },
    { id: 'jp', code: '+81', name: 'Japan' }
  ];


  selectedCountry = '';
  searchText = '';
  angForm: FormGroup;
 

  @Input() prefix: string;
  @Input() phone: string;

  @Output() eventphone = new EventEmitter<string>();
  @Output() eventprefix = new EventEmitter<string>();



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    // init prefix & selectedCountry
    this.prefix = this.countries[0].code;
    this.selectedCountry = this.countries[0].id;
    console.log('ngOnInit this.selectedCountry', this.selectedCountry);
    console.log('ngOnInit this.prefix', this.prefix);
    this.eventprefix.emit(this.prefix);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prefix && changes.prefix.currentValue) {
      this.selectedCountry = this.getidbyprefix(changes.prefix.currentValue);
      console.log('ngOnChanges this.selectedCountry', this.selectedCountry);
      console.log('ngOnChanges this.prefix', this.prefix);
    }

    if (changes.phone && changes.phone.currentValue) {
      this.angForm.get('phone').setValue(changes.phone.currentValue);
      this.phone = changes.phone.currentValue;
      this.eventphone.emit(this.phone);
    }
  }

  updateSearchText(event) {
    this.searchText = event.target.value;
  }

  updatephone(event) {
    this.phone = event.target.value;
    this.eventphone.emit(this.phone);
  }

  getidbyprefix(prefix) {
    const index = this.countries.findIndex(item => item.code === prefix);
    if (index !== -1) {
      return this.countries[index].id;
    }
  }

  createForm() {
    this.angForm = this.fb.group({
      phone: ['', Validators.required ]
    });
  }

  setFlag(country) {
    this.selectedCountry = country.id;
    this.prefix = country.code;
    this.eventprefix.emit(this.prefix);
  }

}
