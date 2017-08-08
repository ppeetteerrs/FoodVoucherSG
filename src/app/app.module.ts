import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//PROVIDERS
import { BarcodeGenerator } from '../providers/barcode-generator';
import { Auth } from '../providers/auth';
import { Database } from '../providers/database';
import { SideMenu } from '../providers/sidemenu';
import { ArraysProvider } from '../providers/arrays';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Toast,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeGenerator,
    Auth,
    SideMenu,
    Database,
    ArraysProvider
  ]
})
export class AppModule {}
