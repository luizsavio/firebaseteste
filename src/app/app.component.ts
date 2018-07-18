import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CriarBolaoPage } from '../pages/criar-bolao/criar-bolao';
import { ListaBolaoPage } from '../pages/lista-bolao/lista-bolao';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html',
  selector: 'myapp'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav; // recuperar um componente do meu template tem que usar o ViewChild
  //@ViewChild(NavController) public navCtrl: NavController;
  rootPage: any = LoginPage;

  public paginas = [
    { titulo: 'Meus Bolões', component: ListaBolaoPage, icone: 'person' },
    { titulo: 'Bolões', component: ListaBolaoPage, icone: 'person' },
    { titulo: 'Criar Bolão', component: CriarBolaoPage, icone: 'calendar' }
  ];
  
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irParaPagina(component) {
    this.nav.push(component);
  }

  sair(){
    this.authService.signOut();
    this.nav.setRoot(LoginPage);
  }

  get avatar() {
    return 'assets/img/avatar-padrao.jpg';
  }

  get UsuarioLogado() {
    console.log('logado?:', this.authService.currentUser );
    return this.authService.currentUser;
  }
}

