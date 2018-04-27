import { CadastroLocalPage } from './../pages/cadastro-local/cadastro-local';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any; //o construtor controla a root page

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public afAuth: AngularFireAuth, private authProvider:AuthProvider) {
      /*aqui verificamos se há um usuário já logado na memoria do angularfireauth
      caso haja não é necessário um novo login, envia o usuario direto pro home*/
      const authObserver = this.afAuth.authState.subscribe(user => {
        if (user) {
          this.rootPage = HomePage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
      });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cadastro de local', component: CadastroLocalPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  // faz logou do usuario usando o metodo do authprovider
  logout(){
    this.authProvider.logoutUser();
    this.nav.setRoot(LoginPage);
  }

}
