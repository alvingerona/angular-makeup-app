import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerSinglePage } from './beer-single';

@NgModule({
  declarations: [
    BeerSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(BeerSinglePage),
  ],
})
export class BeerSinglePageModule {}
