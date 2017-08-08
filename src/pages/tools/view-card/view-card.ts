import { CardIn } from '../../../models/card';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-card',
  templateUrl: 'view-card.html',
})
export class ViewCard {

  card = {} as CardIn;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.card = this.navParams.get("details");
  }

  viewHistory() {
    this.navCtrl.push("ViewCardHistory", {card: this.card});
  }

  editCard() {
    this.navCtrl.push("EditCard", {details: this.card});
  }
}
