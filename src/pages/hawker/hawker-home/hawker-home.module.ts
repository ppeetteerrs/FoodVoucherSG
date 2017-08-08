import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HawkerHome } from './hawker-home';

@NgModule({
  declarations: [
    HawkerHome,
  ],
  imports: [
    IonicPageModule.forChild(HawkerHome),
  ],
  exports: [
    HawkerHome
  ]
})
export class HawkerHomeModule {}
