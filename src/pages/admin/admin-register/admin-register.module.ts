import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminRegister } from './admin-register';

@NgModule({
  declarations: [
    AdminRegister,
  ],
  imports: [
    IonicPageModule.forChild(AdminRegister),
  ],
  exports: [
    AdminRegister
  ]
})
export class AdminRegisterModule {}
