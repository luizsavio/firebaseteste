import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';

/**
 * Generated class for the CriarBolaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-bolao',
  templateUrl: 'criar-bolao.html',
})
export class CriarBolaoPage {
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarBolaoPage');
  }

}
