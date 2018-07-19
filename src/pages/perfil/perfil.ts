import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public toastCtrl: ToastController) {
  }

  tiraFoto() {
    const toast = this.toastCtrl.create({
      message: 'Em breve...',
      duration: 3000
    });
    toast.present();
  }

  get avatar() {
    if (this.authService.authState != null) {
      return (this.authService.authState.photoURL != null) ? this.authService.authState.photoURL : 'assets/img/avatar-padrao.jpg';
    }

  }

  get UsuarioLogado() {
    return this.authService.currentUser;
  }

}
