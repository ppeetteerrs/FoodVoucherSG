import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCard } from './view-card';

@NgModule({
  declarations: [
    ViewCard,
  ],
  imports: [
    IonicPageModule.forChild(ViewCard),
  ],
})
export class ViewCardModule {}
