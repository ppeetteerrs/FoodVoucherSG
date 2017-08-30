import { UserIn, CardsBatchOut } from '../../../models/models';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { BarcodeGenerator } from '../../../providers/barcode-generator';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';

/**
 * Generated class for the AdminBarcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-barcode',
  templateUrl: 'admin-barcode.html',
})
export class AdminBarcode {

  user: UserIn;
  charity_account_list: UserIn[] = [];
  ui_card_batch = {} as CardsBatchOut;
  charityName: string;
  disabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bcg: BarcodeGenerator, private auth: Auth, private db: Database, private loadingCtrl: LoadingController) {
    this.user = this.navParams.get("user");
    if (this.user.accountType == "Charity") {
      this.ui_card_batch.charityID = this.user.id;
    } else {
      this.getCharities();
    }
  }

  async getCharities() {
    let loading = this.loading();
    loading.present();
    this.charity_account_list = await this.db.getAll("auth", "users", "accountType", "Charity", -1);
    loading.dismiss();
  }

  async generate() {
    let loading = this.loading();
    loading.present();
    this.disabled = true;
    this.ui_card_batch.createdAt = new Date();
    this.ui_card_batch.creatorID = this.auth.current_user.id;
    let response = await this.bcg.generateBarcodes(this.ui_card_batch);
    console.log(response);
    console.log("Done Generating Barcodes");
    this.ui_card_batch = {
      charityID: null,
      creatorID: null,
      createdAt: null,
      amount: null,
      quotaPerDay: null,
      quotaPerMonth: null
    };
    this.charityName = null;
    this.disabled = false;
    loading.dismiss();
  }

  onSelectChange(charity_id) {
    this.ui_card_batch.charityID = charity_id;
    console.log(charity_id)
    /*for (let charity of this.charity_account_list) {
      if (charity.name == event) {
        this.ui_card_batch.charityID = charity.id;
        break;
      }
    }*/
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
