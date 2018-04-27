import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as _ from "lodash";
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
    this.itemsRef = db.list('foto');
  }

  getByQuery(orderby, equal) {
    return this.db.list('foto', ref => ref.orderByChild(orderby).equalTo(equal)).snapshotChanges();
  }


  recuperarImagemComCaminho(lista: any[]) {
    let retorno = [];
    let storageRef = firebase.storage().ref()
    for (let obj of lista) {
      storageRef.child(obj).getDownloadURL()
      .then(url => retorno.push({'imagem':obj,'url':url}))
      .catch(function(error) { console.log(error); });
    }
    return retorno;
  }

  uploadMulti(arquivos, key) {
    let files = arquivos;
    let filesIndex = _.range(files.length);
    _.each(filesIndex, idx => {
      let currentUpload = files[idx];

      this.pushUpload(currentUpload, key);
    });
  }

  pushUpload(upload: string, key: string):any {
    let idimagem = this.authProvider.afAuth.auth.currentUser.uid +'-'+new Date().getTime();
    let storageRef = firebase.storage().ref()
    let imageRef = storageRef.child('/' + idimagem + '/' + idimagem+'.jpg');
    imageRef.putString(upload, 'data_url').then(res=>{
      let obj = {idlocal:key, downloadurl:res.downloadURL, nomearquivo:res.ref.name, uid:this.authProvider.afAuth.auth.currentUser.uid};
      this.insere(obj);
    });
  }

  insere(obj){
    this.itemsRef.push(obj);
  }



}
