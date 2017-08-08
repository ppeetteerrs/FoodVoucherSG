import { UserIn } from '../../../models/users';
import { CardsBatchIn } from '../../../models/cards_batch';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';

/**
 * Generated class for the ViewBatchesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-batches',
  templateUrl: 'view-batches.html',
})

export class ViewBatches {

  user: UserIn;
  all_batches = [] as CardsBatchIn[];
  filtered_batches = [] as CardsBatchIn[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private auth: Auth, private db: Database) {

    this.user = this.navParams.get("user");
    this.getBatches();
  }

  async getBatches() {
    let loading = this.loading();
    loading.present();
    if (this.user.accountType == "Charity") {
      this.all_batches = await this.db.getAll("db", "card_batches", "charityID", this.user.id, -1);
    } else if (this.user.accountType == "Admin") {
      this.all_batches = await this.db.getTable("db", "card_batches");
    }
    this.filtered_batches = this.all_batches;
    console.log(this.all_batches);
    loading.dismiss();
  }

  open(batch: CardsBatchIn) {
    this.navCtrl.push("ViewBatch", { batch: batch });
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}