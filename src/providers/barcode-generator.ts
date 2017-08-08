import { CardsBatchOut } from '../models/models';
import { CONFIG } from '../config/config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'

/*
  Generated class for the BarcodeGenerator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BarcodeGenerator {

  url: string;

  constructor(private http: Http) {
    this.url = CONFIG.server_url;
  }

  async generateBarcodes(batch: CardsBatchOut) {
    let base_url = this.url;
    let response = await this.http.post(base_url + "generate_barcodes", batch).map(res => res.json()).toPromise();
    console.log(response);
  }
}
