import { VisualizarFotosPage } from './../visualizar-fotos/visualizar-fotos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista = [];

  constructor(public navCtrl: NavController, private localProvider:LocalProvider, public navParams:NavParams) {
    //this.localProvider.getAllPromisse().then(res=>this.lista = res);
   this.localProvider.getAll().subscribe(res=>this.lista = res);
  }

  abreDetalhes(obj){
    this.navParams.data = obj;
    this.navCtrl.push(VisualizarFotosPage, this.navParams);
  }


}
