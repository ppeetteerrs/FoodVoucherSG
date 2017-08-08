import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { UserAuth } from '../../models/models';
import { Auth } from '../../providers/auth';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {

  ui_user_auth = {} as UserAuth;

  constructor(public navCtrl: NavController, private auth: Auth, private loadingCtrl: LoadingController) {
  }

  async login() {
    let response = await this.auth.login(this.ui_user_auth);
    //this.auth.login(CONFIG.loginAccount);
  }

}
