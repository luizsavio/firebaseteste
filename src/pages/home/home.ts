import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public meusboloes;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public authservice: AuthServiceProvider,
    public fireservice: FirestoreServiceProvider) {
    /*this.meusboloes = {
        'meusboloes': [
      { nomeGravida: 'Carla Braga de Souza', dataInicio: '11/07/2018'},
      { nomeGravida: 'Carla Braga de Souza', dataInicio: '11/07/2018'}
    ]
      };*/
  //console.log('vindo do boloes estativo', this.meusboloes)
  }

  carregarBoloes(){
    this.fireservice.receberTodosDocumentosColecao('bolao')
    .then((doc) => {
      this.meusboloes = doc;
      //console.log('vindo do doc de listar tudo:', doc);
    })
  }

  ionViewDidLoad() {
    /*this.fireservice.gravarDadosGerarIdAutomatico('bolao', this.meusboloes.meusboloes[0])
      .then(
        () => this.presentLoading('cadastrado'),
        (error) => this.presentLoading(error.message)
    );*/
   this.carregarBoloes();
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }
}
