import { CardsBatchIn } from '../../../models/cards_batch';
import { CardIn } from '../../../models/card';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';
/**
 * Generated class for the ViewBatchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-batch',
  templateUrl: 'view-batch.html',
})
export class ViewBatch {

  hideUnused: boolean = true;
  batch: CardsBatchIn;
  batchID: string;
  all_cards = [] as CardIn[];
  filtered_cards = [] as CardIn[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private db: Database, private loadingCtrl: LoadingController) {

    this.batch = this.navParams.get("batch");
    this.batchID = this.batch.id;
    this.getCards();
  }

  async getCards() {
    let loading = this.loading();
    loading.present();
    this.all_cards = await this.db.getAll("db", "cards", "batchUID", this.batchID, -1);
    this.filtered_cards = this.all_cards;
    console.log(this.filtered_cards);
    this.onSelectionChange();
    loading.dismiss();
  }

  view(card: CardIn) {
    this.navCtrl.push("ViewCard", { details: card });
  }

  edit(card: CardIn) {
    this.navCtrl.push("EditCard", { details: card });
  }

  onSelectionChange() {
    if (this.hideUnused) {
      this.filtered_cards = this.all_cards.filter((card) => {
        let nameValid = (card.ownerName != "None") && (card.ownerName != "") && (card.ownerName != "none") && (card.ownerName != null);
        let locValid = (card.ownerLocation != "None") && (card.ownerLocation != "") && (card.ownerLocation != "none") && (card.ownerLocation != null);
        return nameValid && locValid;
      })
    } else {
      this.filtered_cards = this.all_cards;
    }
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
