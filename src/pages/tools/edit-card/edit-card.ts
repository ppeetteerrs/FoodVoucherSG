import { UserIn } from '../../../models/users';
import { CardIn } from '../../../models/card';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Database } from '../../../providers/database';
import { Auth } from '../../../providers/auth';
import { Toast } from '@ionic-native/toast';


/**
 * Generated class for the EditCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-card',
  templateUrl: 'edit-card.html',
})
export class EditCard {

  id: string;
  card = {} as CardIn;
  charity_account_list: UserIn[] = [];
  admin: boolean = false;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, private toast: Toast, public navParams: NavParams, private db: Database, private auth: Auth) {
    this.card = this.navParams.get("details");
    this.admin = (this.auth.current_user.accountType == "Admin");
    if(this.admin) {
      this.getCharities();
    }
  }

  async update() {
    let loading = this.loading();
    loading.present();
    let response = await this.db.updateItem("card", this.card.id, this.card);
    let updatedCard = (await this.db.getAll("db", "cards", "barcode", this.card.barcode, -1))[0];
    this.card = updatedCard;
    loading.dismiss();
    this.toast.show("Card Info Updated", "5000", "bottom");
  }

  async getCharities() {
    let loading = this.loading();
    loading.present();
    this.charity_account_list = await this.db.getAll("auth", "users", "accountType", "Charity", -1);
    loading.dismiss();
  }

  onSelectChange(event) {
    for (let charity of this.charity_account_list) {
      if (charity.name == event) {
        this.card.charityID = charity.id;
        break;
      }
    }
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
