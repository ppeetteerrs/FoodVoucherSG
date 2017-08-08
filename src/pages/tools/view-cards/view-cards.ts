import { UserIn } from '../../../models/users';
import { CardIn } from '../../../models/card';
import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Database } from '../../../providers/database';

/**
 * Generated class for the ViewCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-cards',
  templateUrl: 'view-cards.html',
})

export class ViewCards {

  user: UserIn;
  hideUnused: boolean = true;
  all_cards = [] as CardIn[];
  filtered_cards = [] as CardIn[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private auth: Auth, private db: Database) {

    this.user = this.navParams.get("user");
    this.getCards();
  }

  async getCards() {
    let loading = this.loading();
    loading.present();
    if (this.user.accountType == "Charity") {
      this.all_cards = await this.db.getAll("db", "cards", "charityID", this.user.id, -1);
    } else if (this.user.accountType == "Admin") {
      this.all_cards = await this.db.getTable("db", "cards");
    }
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