import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FirestoreServiceProvider } from '../../providers/firestore-service/firestore-service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';

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

  public nome: string;
  public data;
  public editarForm: FormGroup;
  public bolao: any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public firestoreService: FirestoreServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fb: FormBuilder) {
    this.editarForm = fb.group({
      nomeGravida: ['', Validators.compose([Validators.required])],
      dataNascimento: ['']
    });
    this.bolao = navParams.data;

    this.nome = this.bolao.nomeGravida;
    (this.bolao.dataNascimento) ? this.data = this.bolao.dataNascimento : null;

  }

  salvar(){

  }

  ionViewDidLoad() {
  }

}
