import { UserIn } from '../../../models/users';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the AdminCharityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-charity',
  templateUrl: 'admin-charity.html',
})
export class AdminCharity {

  charities: UserIn[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private db: Database, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
    this.getCharities();
  }

  async getCharities() {
    let loading = this.loading();
    loading.present();
    this.charities = await this.db.getAll("auth", "users", "accountType", "Charity", -1);
    loading.dismiss();
  }


  presentActionSheet(charity: UserIn) {
    let actionSheet = this.actionSheetCtrl.create({
      title: charity.name,
      buttons: [
        {
          text: 'View Balances',
          icon: 'logo-usd',
          handler: () => {
            this.navCtrl.push("ViewBalances", { user: charity });
          }
        }, {
          text: 'View Records',
          icon: 'list',
          handler: () => {
            this.navCtrl.push("ViewTransactionHistory", { user: charity });
          }
        }, {
          text: 'View Cards',
          icon: 'albums',
          handler: () => {
            this.navCtrl.push("ViewCards", { user: charity });
          }
        }, {
          text: 'View Batches',
          icon: 'folder',
          handler: () => {
            this.navCtrl.push("ViewBatches", { user: charity });
          }
        }, {
          text: 'Send Barcodes',
          icon: 'barcode',
          handler: () => {
            this.navCtrl.push("AdminBarcode", { user: charity });
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
