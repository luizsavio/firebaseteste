import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';

@IonicPage()
@Component({
  selector: 'page-bolao-participantes',
  templateUrl: 'bolao-participantes.html',
})
export class BolaoParticipantesPage {

  public bolao;
  public listaParticipantes = Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firestoreService: FirestoreServiceProvider) {
    this.bolao = navParams.data;
    console.log('o que veio do volao pgparticipantes:', this.bolao);
  }

  ionViewDidLoad() {
    this.carregarParticipantes();
  }

  carregarParticipantes() {
    this.listaParticipantes = new Array();
    for (const item of this.bolao.bolaoparticipantes.participantes) {
      this.firestoreService.receberVariosDocumentosFiltrado('usuario', 'uid', '==', item.idUsuario)
        .then((lista) => {
          for (const itemArray of lista) {
            this.listaParticipantes.push(itemArray);
          }
          console.log('lista de usuario:', this.listaParticipantes);
        });
    }
  }

}
