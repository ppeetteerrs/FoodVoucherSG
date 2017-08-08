import { Payment } from '../../../models/payment';
import { UserIn } from '../../../models/users';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';
/**
 * Generated class for the AdminPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-payment',
  templateUrl: 'admin-payment.html',
})
export class AdminPayment {

  user: UserIn;
  hawkers = [] as UserIn[];
  hawker: UserIn;
  amount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private db: Database, private loadingCtrl: LoadingController) {
    this.user = this.navParams.get("user");
    if (this.user.accountType == "Hawker") {
      this.hawker = this.navParams.get("user");
      console.log(this.user);
    } else {
      this.getHawkers();
    }
  }

  async getHawkers() {
    let loading = this.loading();
    loading.present();
    this.hawkers = await this.db.getAll("auth", "users", "accountType", "Hawker", -1);
    loading.dismiss();
  }

  async createPayment() {
    let loading = this.loading();
    loading.present();
    if (this.amount && this.amount != null && this.amount > 0) {
      let payment: Payment = {
        from_id: this.auth.current_user.id,
        from_name: this.auth.current_user.name,
        to_id: this.hawker.id,
        to_name: this.hawker.name,
        amount: this.amount,
        type: this.auth.current_user.accountType,
        confirmed: false,
        rejected: false
      };
      let response = await this.db.uploadPayment(payment);
      console.log(response);
      loading.dismiss();
      this.navCtrl.popToRoot();
    }
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }

  onSelectChange(event) {
    this.hawker = event;
  }
}
