import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTransactionHistory } from './view-transaction-history';

@NgModule({
  declarations: [
    ViewTransactionHistory,
  ],
  imports: [
    IonicPageModule.forChild(ViewTransactionHistory),
  ],
})
export class ViewTransactionHistoryModule {}
