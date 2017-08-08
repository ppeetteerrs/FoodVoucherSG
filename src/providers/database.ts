import { Payment } from '../models/payment';
import { CardOut, CardIn, UserAuth, UserIn, UserOut, CardsBatchIn, CardsBatchOut, DBGetAllRequest, DBUpdateRequest, TransactionIn, TransactionOut } from '../models/models';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from '../config/config';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  constructor(public http: Http) {
  }

  
  async getAll(db: string, table: string, index: string, value, limit: number) {
    let isInt: boolean = false;
    if(typeof(value) == "number"){
      isInt = true;
    }
    let db_request: DBGetAllRequest = {
      db: db,
      table: table,
      index: index,
      value: value,
      valueIsInt: isInt,
      limit: limit
    };
    let data_response = await this.http.post(CONFIG.server_url + "db/get_all", db_request).map(res => res.json()).toPromise();
    return data_response;
  }

  async getTable(db: string, table: string) {
    let data_response = await this.http.post(CONFIG.server_url + "db/get_table", {db: db, table: table}).map(res => res.json()).toPromise();
    return data_response;
  }

  async updateItem(type: string, id: string, object) {
    let db_request: DBUpdateRequest = {
      id: id,
      object: object,
      type: type
    }
    let data_response: any = await this.http.post(CONFIG.server_url + "db/update_item", db_request).map(res => res.json()).toPromise();
    return data_response;
  }

  async checkCode(barcode: number) {
    let data_response: any = await this.http.post(CONFIG.server_url + "db/check_code", {code: barcode}).map(res => res.json()).toPromise();
    return data_response;
  }

  async uploadTransaction(transaction: TransactionOut) {
    let data_response: any = await this.http.post(CONFIG.server_url + "db/upload_transaction", transaction).map(res => res.json()).toPromise();
    return data_response;
  }

  async uploadPayment(payment: Payment) {
    let data_response: any = await this.http.post(CONFIG.server_url + "db/upload_payment", payment).map(res => res.json()).toPromise();
    return data_response;
  }

}
