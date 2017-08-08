import { UserOut } from '../../../models/models';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../../providers/auth'

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-register',
  templateUrl: 'admin-register.html',
})
export class AdminRegister {

  ui_user_register = {} as UserOut;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, private loadingCtrl: LoadingController) {
  }

  async register() {
    let  loading = this.loading();
    loading.present();
    await this.auth.register(this.ui_user_register);
    this.ui_user_register = {} as UserOut;
    loading.dismiss();
  }

  logout() {
    this.auth.logout();
  }

  loading() {
    return this.loadingCtrl.create({
      content: "Loading, Please Wait...",
    });
  }
}
