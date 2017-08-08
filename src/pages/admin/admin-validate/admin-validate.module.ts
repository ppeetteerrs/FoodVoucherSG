import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminValidate } from './admin-validate';

@NgModule({
  declarations: [
    AdminValidate,
  ],
  imports: [
    IonicPageModule.forChild(AdminValidate),
  ],
  exports: [
    AdminValidate
  ]
})
export class AdminValidateModule {}
