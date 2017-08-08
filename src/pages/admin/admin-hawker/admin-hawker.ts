import { UserIn } from '../../../models/users';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the AdminHawkerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-hawker',
  templateUrl: 'admin-hawker.html',
})
export class AdminHawker {

  hawkers: UserIn[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private db: Database, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
    this.getHawkers();
  }

  async getHawkers() {
    let loading = this.loading();
    loading.present();
    this.hawkers = await this.db.getAll("auth", "users", "accountType", "Hawker", -1);
    loading.dismiss();
  }

  presentActionSheet(hawker: UserIn) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'View Balances',
          icon: 'logo-usd',
          handler: () => {
            this.navCtrl.push("ViewBalances", {user: hawker});
          }
        }, {
          text: 'View Records',
          icon: 'list',
          handler: () => {
            this.navCtrl.push("ViewTransactionHistory", {user: hawker});
          }
        }, {
          text: 'Send Payment',
          icon: 'card',
          handler: () => {
            this.navCtrl.push("AdminPayment", {user: hawker});
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
