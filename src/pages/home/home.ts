import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
declare var auth;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  public meusboloes: Object[];

  constructor(public navCtrl: NavController,
  public authservice: AuthServiceProvider) {
    this.meusboloes = [
      {nomeGravida: 'Carla Braga de Souza', dataInicio: '11/07/2018'},
      {nomeGravida: 'Bruna Marquezine de Souza', dataInicio: '11/07/2018'},
      {nomeGravida: 'Alejandra da Silva', dataInicio: '11/07/2018'},
      {nomeGravida: 'Joana Bragantino', dataInicio: '11/07/2018'},
      {nomeGravida: 'Silvana Gabriel Souza', dataInicio: '11/07/2018'},
    ];
    /*var user = authservice.currentUser;

    user.updateProfile({
      displayName: "Luiz Savio S Moraes"
    }).then(function() {
      console.log("nome do usuario alterado")
    }).catch(function(error) {
      console.log("nome não foi alterado:", error)
    });*/
  }

  ionViewDidLoad(){
      
  }
}
