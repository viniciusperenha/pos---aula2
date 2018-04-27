import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';


/*
  Generated class for the FotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FotosProvider {

  itemsRef: AngularFireList<any>;

  constructor(protected db: AngularFireDatabase, private authProvider: AuthProvider) {
    this.itemsRef = db.list('foto'); //seleciona qual tabela será conectado
  }
  /* buscas com query no firebase só aceitam um atributo para filtro e uma ordenaçao
  /nesse metodo está mais generico onde order by é o campo que quer buscar e
  equalTo é o valor que vc quer que o campo order by tenha */
  getByQuery(orderby, equal) {
    return this.db.list('foto', ref => ref.orderByChild(orderby).equalTo(equal)).snapshotChanges();
  }

  //passamos a chave do local e as coordenadas por parametro para salvar junto com a foto
  uploadMulti(arquivos, key, coordenadas) {
    // percorre todas as imagens do upload
    for(let arquivo of arquivos){
      this.pushUpload(arquivo, key, coordenadas);
    }

  }

  pushUpload(upload: string, key: string, coordenadas):any {
    // cria um ID unico para a foto no storage, é o usuario que faz o upload e o time
    let idimagem = this.authProvider.afAuth.auth.currentUser.uid +'-'+new Date().getTime();
    //cria uma referencia ao storage do nosso banco firebase
    let storageRef = firebase.storage().ref()
    /* cria o registro no firebase..nota-se que passei a KEY do local, dessa maneira será
    criada uma pasta no storage com o KEY do local e a imagem em JPG com o nome que criamos */
    let imageRef = storageRef.child('/' + key + '/' + idimagem+'.jpg');
    // insere a imagem no arquivo criado no storage, como usamos data_url usamos o metodo putString
    imageRef.putString(upload, 'data_url').then(res=>{
      /*ao final do upload pegamos os dados da imagem no caso salvamos o nome do arquivo
      a url de download, facilitando mostrar na view novamente, o dono da imagem e as coordenadas
      */
      let obj = {idlocal:key, downloadurl:res.downloadURL, nomearquivo:res.ref.name, uid:this.authProvider.afAuth.auth.currentUser.uid, coordenadas:coordenadas};
      this.insere(obj);
    });
  }
  // salva o obj foto depois do upload feito
  insere(obj){
    this.itemsRef.push(obj);
  }



}
