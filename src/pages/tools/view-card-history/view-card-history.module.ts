import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCardHistory } from './view-card-history';

@NgModule({
  declarations: [
    ViewCardHistory,
  ],
  imports: [
    IonicPageModule.forChild(ViewCardHistory),
  ],
})
export class ViewCardHistoryModule {}
