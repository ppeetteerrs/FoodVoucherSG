import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCards } from './view-cards';

@NgModule({
  declarations: [
    ViewCards,
  ],
  imports: [
    IonicPageModule.forChild(ViewCards),
  ],
})
export class ViewCardsModule {}
