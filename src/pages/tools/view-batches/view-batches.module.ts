import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBatches } from './view-batches';

@NgModule({
  declarations: [
    ViewBatches,
  ],
  imports: [
    IonicPageModule.forChild(ViewBatches),
  ],
})
export class ViewBatchesModule {}
