import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, /*NavParams,*/ LoadingController, AlertController, App, Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-slider',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  
  public backgroundImage = 'assets/img/background/background-6.jpg';
  loginForm: FormGroup;
  formSignup: FormGroup;
  formReset: FormGroup;
  

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public authService: AuthServiceProvider,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.formSignup = fb.group({
      nameSignUp: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      emailSignUp: ['', Validators.compose([Validators.required, Validators.email])],
      passwordSignUp: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordSignUpConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.formReset = fb.group({
      emailReset: ['', Validators.compose([Validators.required, Validators.email])]
    });
    console.log('carregando o login', authService.currentUser);
  }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }
    this.authService.signInWithEmailAndPassword(data.email, data.password)
    .then((data) => {
      this.navCtrl.setRoot(HomePage);
      console.log(data);
    },
    (error) => this.presentLoading(error.message)
    );
    /*this.authService.loginWithEmail(data.email, data.password)
      .then(
        () => {
          console.log(this.authService);
          this.navCtrl.setRoot(HomePage)
        },
        (error) => this.presentLoading(error.message)
      );*/

    //this.navCtrl.push(HomePage);
  }

  signUp() {
    let data = this.formSignup.value;

    /*console.log("Senha:", data.passwordSignUp);
    console.log("Senha Confirmação:", data.passwordSignUpConfirm);*/
    if (!data.emailSignUp) {
      return;
    }
    if (data.passwordSignUp != data.passwordSignUpConfirm) {
      this.presentLoading('Senha incorreta!');
      return;
    }

    this.authService.createUserWithEmailAndPassword(data.nameSignUp ,data.emailSignUp, data.passwordSignUp)
      .then(() => {
        this.slider.slideTo(1);
        this.presentLoading('Usuário cadastrado com sucesso!');
      },
        (error) => {
          this.presentLoading(error.message);
          return;
        });
  }

  resetPassword() {
    let data = this.formReset.value;

    if (!data.emailReset) {
      return;
    }

    this.authService.resetPasswordEmail(data.emailReset)
    .then(
      () => this.presentLoading('Password Reset Email Sent!'),
      (error) => this.presentLoading(error))
    
  }

  signGoogle() {
    this.authService.signInWithGoogle()
    .then(
      (user) => {
        console.log("Dados usuario Google", user);
        this.navCtrl.setRoot(HomePage)
      },
      error => console.log(error.message)
    );

    
  }

  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
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