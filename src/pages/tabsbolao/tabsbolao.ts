import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { BolaoInformacaoPage } from '../bolao-informacao/bolao-informacao';
import { BolaoParticipantesPage } from '../bolao-participantes/bolao-participantes';
import { BolaoPalpitePage } from '../bolao-palpite/bolao-palpite';
import { BolaoEditarPage } from '../bolao-editar/bolao-editar';

/**
 * Generated class for the TabsbolaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabsbolao',
  templateUrl: 'tabsbolao.html',
})
export class TabsbolaoPage {
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = BolaoInformacaoPage;
    this.tab2 = BolaoParticipantesPage;
    this.tab3 = BolaoPalpitePage;
    this.tab4 = BolaoEditarPage;
    
  }


}
