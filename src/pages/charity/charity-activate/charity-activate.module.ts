import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharityActivate } from './charity-activate';

@NgModule({
  declarations: [
    CharityActivate,
  ],
  imports: [
    IonicPageModule.forChild(CharityActivate),
  ],
})
export class CharityActivateModule {}
