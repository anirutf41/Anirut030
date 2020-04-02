import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatComparePage } from './cat-compare';

@NgModule({
  declarations: [
    CatComparePage,
  ],
  imports: [
    IonicPageModule.forChild(CatComparePage),
  ],
})
export class CatComparePageModule {}
