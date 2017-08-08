import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCard } from './edit-card';

@NgModule({
  declarations: [
    EditCard,
  ],
  imports: [
    IonicPageModule.forChild(EditCard),
  ],
})
export class EditCardModule {}
