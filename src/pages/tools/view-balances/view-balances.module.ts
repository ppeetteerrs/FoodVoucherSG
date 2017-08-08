import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBalances } from './view-balances';

@NgModule({
  declarations: [
    ViewBalances,
  ],
  imports: [
    IonicPageModule.forChild(ViewBalances),
  ],
})
export class ViewBalancesModule {}
