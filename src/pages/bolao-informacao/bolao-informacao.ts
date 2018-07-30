import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the BolaoInformacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bolao-informacao',
  templateUrl: 'bolao-informacao.html',
})
export class BolaoInformacaoPage {
  public bolao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreServiceProvider,
    public authService: AuthServiceProvider) {
    this.bolao = navParams.data;
    console.log('bolao informaçao:', this.bolao);
  }

  participar() {
    //tem que corrigir este problema para adicionar um novo campo
    this.firestoreService.receberUmDocumento('bolaoparticipantes', this.bolao.idBolao)
      .then((objeto) => {
        let obj = objeto.data();
        let lista = new Array();
        lista = obj.participantes;
        let objetoUsuario = {
          idUsuario: this.authService.currentUser.uid,
          participando: true,
          dataPalpite: null
        }
        lista.push(objetoUsuario);
        obj.participantes = lista;
        console.log('VErificando objeto ', obj);
        this.firestoreService.gravarDadosSemGerarIdAutomatico('bolaoparticipantes', this.bolao.idBolao, obj);
        let lista02 = new Array();
        lista02 = this.bolao.bolaoparticipantes.participantes;
        lista02.push(objetoUsuario);
        this.bolao.bolaoparticipantes.participantes = lista02;
        this.bolao['participando'] = true;
        console.log('bolao informaçao:', this.bolao);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BolaoInformacaoPage');
  }


  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: message,
        buttons: ['Fechar']
      });
      alert.present();
    });

    loading.present();
  }
}
