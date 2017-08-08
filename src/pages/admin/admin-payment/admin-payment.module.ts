import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPayment } from './admin-payment';

@NgModule({
  declarations: [
    AdminPayment,
  ],
  imports: [
    IonicPageModule.forChild(AdminPayment),
  ],
})
export class AdminPaymentModule {}
