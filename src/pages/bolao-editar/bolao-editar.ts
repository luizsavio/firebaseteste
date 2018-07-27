import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BolaoEditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bolao-editar',
  templateUrl: 'bolao-editar.html',
})
export class BolaoEditarPage {

  teste;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teste = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BolaoEditarPage');
  }

}
