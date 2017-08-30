import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeGenerator } from '../../../providers/barcode-generator';
import { Database } from '../../../providers/database';
/**
 * Generated class for the AdminVaildate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-validate',
  templateUrl: 'admin-validate.html',
})
export class AdminValidate {

  ui_barcode_number : number;
  ui_verfication_status : string;
  ui_test : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: Database, private barcodeScanner: BarcodeScanner) {
    this.scan();
  }

  async scan() {
    let barcodeData = await this.barcodeScanner.scan();
    this.ui_barcode_number = parseInt(barcodeData.text);
    if(this.ui_barcode_number) {
      let card = (await this.db.getAll("db", "cards", "barcode", this.ui_barcode_number, -1))[0];
      this.navCtrl.setRoot("ViewCard", {details: card});
    }
  }


}
