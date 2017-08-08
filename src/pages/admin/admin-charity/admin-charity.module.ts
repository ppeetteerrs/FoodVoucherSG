import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCharity } from './admin-charity';

@NgModule({
  declarations: [
    AdminCharity,
  ],
  imports: [
    IonicPageModule.forChild(AdminCharity),
  ],
})
export class AdminCharityModule {}
