import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalProvider } from '../../providers/local/local';


/**
 * Generated class for the CadastroLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-local',
  templateUrl: 'cadastro-local.html',
})
export class CadastroLocalPage {

  localForm: FormGroup;
  home = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private localProvider:LocalProvider) {
  /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
      */
      this.localForm = formBuilder.group({
        pais: ['', Validators.required],
        local: ['', Validators.required],
        altitude: ['', Validators.required],
        longitude: ['', Validators.required]
      });
  }
  //caso o formulario seja valido salva o local e volta pra pagina inicial
  salvarLocal(){
    if (!this.localForm.valid) {
      alert('preencha todos os campos');
    } else {
      this.localProvider.insere(this.localForm.value);
      alert('salvo');
      this.voltarPagina();
    }
  }

  voltarPagina(){
    this.navCtrl.setRoot(HomePage);
  }
}
