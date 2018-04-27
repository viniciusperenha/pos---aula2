import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroLocalPage } from './cadastro-local';

@NgModule({
  declarations: [
    CadastroLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroLocalPage),
  ],
})
export class CadastroLocalPageModule {}
