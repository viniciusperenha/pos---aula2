import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotosProvider } from '../../providers/fotos/fotos';
import { IncluiFotoPage } from '../inclui-foto/inclui-foto';

/**
 * Generated class for the VisualizarFotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-fotos',
  templateUrl: 'visualizar-fotos.html',
})
export class VisualizarFotosPage {

  local: any = {};
  fotosmostrar = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fotosProvider:FotosProvider) {
    this.local = this.navParams.data;
    this.fotosProvider.getByQuery('idlocal', this.local.payload.key).subscribe(resp => this.fotosmostrar = resp);
  }


  incluirFoto(){
    this.navParams.data = this.local;
    this.navCtrl.push(IncluiFotoPage, this.navParams);
  }

  voltarPagina(){
    this.navCtrl.pop();
  }

}
