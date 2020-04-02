import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverviweDetailPage } from './overviwe-detail';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    OverviweDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OverviweDetailPage),
    StarRatingModule
  ],
})
export class OverviweDetailPageModule {}
