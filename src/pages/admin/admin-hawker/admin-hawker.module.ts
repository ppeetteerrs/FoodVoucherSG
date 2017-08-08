import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHawker } from './admin-hawker';

@NgModule({
  declarations: [
    AdminHawker,
  ],
  imports: [
    IonicPageModule.forChild(AdminHawker),
  ],
})
export class AdminHawkerModule {}
