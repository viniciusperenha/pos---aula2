import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {

  }
  // faz login usando email e password, usando a autenticacao do firebase
  // NECESSARIO ATIVAR O RECURSO NO BANCO
  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  // aqui faz logout pois podemos ter varios tipos de autenticacao, facebook, google
  // cada uma tem seu metodo de logout, se tiver mais tipos, validar um a um aqui para logout
  logoutUser(): Promise<any> {
    if(this.afAuth.auth.currentUser.providerData.length){
      for(let i = 0; i<this.afAuth.auth.currentUser.providerData.length;i++){
        let provider = this.afAuth.auth.currentUser.providerData[i];

        if(provider.providerId == "password"){

          return this.afAuth.auth.signOut();
        }

      }
    }
  }
  // cria um usuario no firebase com email e senha
  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

}
