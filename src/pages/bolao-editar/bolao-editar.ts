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
    let data = this.editarForm.value;
    let lista = new Array();
    let lista2 = [9,2,7]
    for (let itemparticipante of this.bolao.bolaoparticipantes.participantes) {
      var dataPalpite = new Date(itemparticipante.dataPalpite);
      var dataNascimento = new Date(data.dataNascimento);
      var timeDiff = Math.abs(dataNascimento.getTime() - dataPalpite.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      itemparticipante['dias'] = diffDays;
      lista.push(itemparticipante);
     }
     let listaminima = (array) => {
      return Math.min.apply(Math, array);
  };
    console.log('teste lista organizado', listaminima(lista2));
     console.log('dias', lista);
    let objEditado = {
      dataNascimento: data.dataNascimento
    }
    //this.firestoreService.atualizarDocumento('bolao', this.bolao.idBolao, objEditado);
  }

  ganhadorProximo(){
     
  }

  ionViewDidLoad() {
  }

}
