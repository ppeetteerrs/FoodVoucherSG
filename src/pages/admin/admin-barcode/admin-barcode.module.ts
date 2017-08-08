import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminBarcode } from './admin-barcode';

@NgModule({
  declarations: [
    AdminBarcode,
  ],
  imports: [
    IonicPageModule.forChild(AdminBarcode),
  ],
  exports: [
    AdminBarcode
  ]
})
export class AdminBarcodeModule {}
