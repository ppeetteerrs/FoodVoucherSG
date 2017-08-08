import { Subject } from 'rxjs/Rx';
import { UserAuth, UserIn } from '../models/models';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from '../config/config'
import { Storage } from '@ionic/storage';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  current_user: UserIn = null;
  current_user_subject = new Subject<UserIn>();

  constructor(private http: Http, private storage: Storage) {

    //this.storage.clear();

    this.current_user_subject.subscribe((data) => {
      this.storage.set('current_user', this.current_user)
        .then(
        () => {
          if(data != null) {
            console.log('Stored user as ' + data.name);
          } else {
            console.log("Logged Out");
          }
        },
        error => console.error('Error storing current user', error)
        );
    });
    this.storage.get('current_user').then((data: UserIn) => {
      this.current_user = data;
      if (data != null) {
        console.log("Logged in as " + data.name);
        this.current_user_subject.next(this.current_user);
      }
    });
  }

  async login(userAuth: UserAuth) {
    if (userAuth == null) {
      console.log("FUCKED UP");
    }
    console.log(userAuth);
    let loginResponse = await this.http.post(CONFIG.server_url + "auth/login", userAuth).map(res => res.json()).toPromise();
    if (loginResponse.error_message) {
      console.log("Error Logging In");
    } else {
      this.current_user = {
        id: loginResponse.id,
        email: loginResponse.email,
        name: loginResponse.name,
        accountType: loginResponse.accountType
      };
      console.log(this.current_user);
    }
    this.current_user_subject.next(this.current_user);
    return loginResponse;
  }

  async register(userAuth: UserAuth) {
    let registerResponse = await this.http.post(CONFIG.server_url + "auth/register", userAuth).map(res => res.json()).toPromise();
    console.log(registerResponse);
    return registerResponse;
  }

  logout() {
    this.current_user = null;
    this.current_user_subject.next(this.current_user);
    return this.current_user;
  }

}
