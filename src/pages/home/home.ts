import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista = [];

  constructor(public navCtrl: NavController, private localProvider:LocalProvider) {
    //this.localProvider.listaTodos().then(res=>this.lista = res);
   this.localProvider.getAll().subscribe(res=>this.lista = res);
  }

}
