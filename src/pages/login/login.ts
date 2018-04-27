import { HomePage } from './../home/home';
import { EmailValidator } from './../../validators/email';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;


  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['viniciusperenha@gmail.com', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['123456', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });
  }


  voltarPagina() {
    this.navCtrl.pop();
  }

  loginUser() {

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {

          this.navCtrl.setRoot(HomePage);

        }, error => {
            alert('Login / senha incorretos');
        });

    }
  }

}
