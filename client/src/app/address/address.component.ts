//Address component.ts - Type Script file that contains code to render adddress feature to elearning application 


//including the required files and services 
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';


//componnet files specifications 
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})


//exporting the addtess component 
export class AddressComponent implements OnInit {
  btnDisabled = false;

  currentAddress: any;

  addr1='';
          addr2='';
          city='';
          state='';
          country='';
          postalCode='';

  constructor(private data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:3000/api/accounts/address'
      );
console.log("get data",data)
      if (
        JSON.stringify(data['address']) === '{}' &&
        this.data.message === ''
      ) {
        this.data.warning(
          'You have not entered your shipping address. Please enter your shipping address.'
        );
      }
      this.currentAddress = data['address'];
      console.log( this.currentAddress)
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async postAddress() {
    console.log('POST ADDRESS')
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(
        'http://localhost:3000/api/accounts/address',
        {addr1: this.addr1,
          addr2: this.addr2,
          city: this.city,
          state: this.state,
          country: this.country,
          postalCode: this.postalCode}
      );
console.log(res)
      res['success']
        ? (this.data.success(res['message']), await this.data.getProfile())
        : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  async updateAddress() {
    console.log('UPDATE ADDRESS')
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(
        'http://localhost:3000/api/accounts/address',
        this.currentAddress
      );
console.log(res)
      res['success']
        ? (this.data.success(res['message']), await this.data.getProfile())
        : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
