import { Page } from '../models/page';
import { UserIn } from '../models/models';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth';
import { SideMenu } from '../providers/sidemenu';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "Login";
  pages: Page[] = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: Auth, private sideMenu: SideMenu, public menuCtrl: MenuController, public keyboard: Keyboard) {
    platform.ready().then(() => {

      this.keyboard.disableScroll(true);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (this.auth.current_user == null) {
        this.nav.setRoot("Login");
        this.menuCtrl.enable(false);
      }
    });
    this.auth.current_user_subject.subscribe((data: UserIn) => {
      if (data == null) {
        this.nav.setRoot("Login");
        this.menuCtrl.enable(false);
      } else {
        this.setPages(data.accountType);
        this.menuCtrl.enable(true);
        this.nav.setRoot(this.pages[0].page, {user: this.auth.current_user});
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page, {user: this.auth.current_user});
  }

  setPages(accountType: string) {
    this.pages = this.sideMenu.pages[accountType];
  }

  logout() {
    this.auth.logout();
  }

  isCurrentPage(page: Page) {
    return this.nav.getActive().name == page.page;
  }
}
