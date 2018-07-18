import { Injectable } from '@angular/core';

declare var auth;
declare var firebase;
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  authState: any = null;

  constructor() {

  }

  createUserWithEmailAndPassword(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.updateProfileName(name);
          console.log('usuario apos cadastro', this.authState);
          resolve();
          console.log('Aprovando cadastro');
        })
        .catch((error) => {
          reject(error);
          console.log('Reprovando cadastro');
        });
    });

  }

  updateProfileName(name: string){
    var user = this.currentUser;
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log("Nome adicionado")
        }).catch(function(error) {
          console.log("nome não foi alterado:", error)
        });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
          this.authState = auth;
          resolve(auth);
          console.log('aprovando login');
        })
        .catch((error) => {
          reject(error);
          console.log('Reprovando login');
        });
    });
  }

  signInWithGoogle(): any {
    var provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      auth.signInWithPopup(provider).then((result) => {
        this.authState = result;
        resolve(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("Dados do token:", token);
        console.log("Dados do usuario:", user);
      }).catch((error) => {
        reject(error);
      });
    });

  }

  resetPasswordEmail(email: string){
    return new Promise((resolve, reject) => {
      auth.sendPasswordResetEmail(email).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    })
  }

  signOut(){
    return new Promise((resolve, reject) => {
      auth.signOut().then(
        () => {
          resolve();
          this.authState = null;
        },
        () => reject()
      )
    });
    
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  onAuthStateChanged(): any{
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        this.authState = user
        // ...
      } else {
        this.authState = null;
      }
    });
  }

}
