import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomAddPage } from './room-add';

@NgModule({
  declarations: [
    RoomAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomAddPage),
  ],
})
export class RoomAddPageModule {}
