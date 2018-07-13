//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceFire2Provider {

  authState: firebase.User;
 
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
 
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }
 
  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }
 
  get currentUserName(): string {
    return this.authState['email'];
  }
 
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
 
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }
 
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
 
  /*get authenticated(): boolean {
    return (this.authState !== null);
  }*/

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
      /*.then(() => {
        
        //console.log("autenticado:", this.authState);
      })
      .catch(error => {
        console.log("Erro do service: ",error);
        throw error
      })*/
  }

  resetPasswordEmail(email: string){
    this.afAuth.auth.sendPasswordResetEmail(email, null);
  }
 
  signOut(): void {
    this.afAuth.auth.signOut();
  }

  signInWithGoogle():any {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}

private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.providerId;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				alert(error.message);
			});
		});
	}
}

}
