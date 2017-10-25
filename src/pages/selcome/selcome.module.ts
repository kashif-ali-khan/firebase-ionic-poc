import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelcomePage } from './selcome';

@NgModule({
  declarations: [
    SelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(SelcomePage),
  ],
})
export class SelcomePageModule {}
