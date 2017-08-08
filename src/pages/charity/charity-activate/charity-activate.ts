import { CardIn } from '../../../models/models';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Database } from '../../../providers/database';
import { Auth } from '../../../providers/auth';

/**
 * Generated class for the CharityActivatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charity-activate',
  templateUrl: 'charity-activate.html',
})
export class CharityActivate {

  ui_barcode_number: number;
  barcode_number: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private db: Database, private auth: Auth, private loadingCtrl: LoadingController) {

   
  }

  async scan() {
    let barcodeData = await this.barcodeScanner.scan();
    this.barcode_number = parseInt(barcodeData.text);
    this.getCardDetails(this.barcode_number);
  }

  async edit() {
    if(this.ui_barcode_number) {
      this.getCardDetails(this.ui_barcode_number);
    }
  }

  async getCardDetails(barcode) {
    let loading = this.loading();
    loading.present();
    this.ui_barcode_number = null;
    this.barcode_number = null;
    let card_details: CardIn[] = await this.db.getAll("db", "cards", "barcode", parseInt(barcode), 1);
    console.log(card_details);
    //Only allow edit when card exists and belongs to that charity
    if(card_details[0] && card_details[0].charityName == this.auth.current_user.name) {
      loading.dismiss();
      this.navCtrl.push("EditCard",{details: card_details[0], id: card_details[0].id});
    } else {
      console.log("No such card");
      loading.dismiss();
    }
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }

}
