import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaBolaoPage } from './lista-bolao';

@NgModule({
  declarations: [
    ListaBolaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaBolaoPage),
  ],
})
export class ListaBolaoPageModule {}
