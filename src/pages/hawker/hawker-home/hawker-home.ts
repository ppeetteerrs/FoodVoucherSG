import { TransactionOut } from '../../../models/transaction';
import { CardIn } from '../../../models/card';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Database } from '../../../providers/database'
import { Auth } from '../../../providers/auth'

/**
 * Generated class for the HawkerHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hawker-home',
  templateUrl: 'hawker-home.html',
})
export class HawkerHome {

  barcode_text: number;
  ui_barcode_number: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private db: Database, private alertCtrl: AlertController, private auth: Auth) {
  }

  async scan() {
    let barcodeData = await this.barcodeScanner.scan();
    this.barcode_text = parseInt(barcodeData.text);
    let response = await this.db.checkCode(parseInt(barcodeData.text));
    if (response.error_message) {
      console.log(response.error_message);
    } else {
      this.presentConfirm(response);
    }
    this.barcode_text = null;
  }

  async check() {
    let loading = this.loading();
    loading.present();
    let response = await this.db.checkCode(this.ui_barcode_number);
    loading.dismiss();
    if (response.error_message) {
      console.log(response.error_message);
    } else {
      this.presentConfirm(response);
    }
    this.ui_barcode_number = null;
  }

  presentConfirm(card: CardIn) {
    let alert = this.alertCtrl.create({
      title: "Confirm?",
      message: "<p>Owner: " + card.ownerName + "</p><p>Meals Left Today: " + (card.quotaPerDay - card.redeemedToday) + "/" + card.quotaPerDay + "</p><p>Meals Left This Month: " + (card.quotaPerMonth - card.redeemedThisMonth) + "/" + card.quotaPerMonth + "</p>",
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            this.confirmTransaction(card).then((response) => {
              this.transactionDone(response);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  transactionDone(response) {
    console.log(response);
  }

  async confirmTransaction(card: CardIn) {
    let transaction: TransactionOut = {
      hawkerID: this.auth.current_user.id,
      hawkerName: this.auth.current_user.name,
      cardID: card.id,
      charityID: card.charityID,
      charityName: card.charityName,
      cardBarcode: card.barcode,
      ownerName: card.ownerName,
      ownerLocation: card.ownerLocation,
      date: new Date()
    }
    let loading = this.loading();
    loading.present();
    let response = await this.db.uploadTransaction(transaction);
    loading.dismiss();
    return response;
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
