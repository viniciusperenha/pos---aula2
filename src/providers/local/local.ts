import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the LocalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalProvider {


  itemsRef: AngularFireList<any>;

  constructor(protected db: AngularFireDatabase) {
    this.itemsRef = db.list('local');


  }

  listaTodos(): Promise<any> {
    return new Promise((resolve) => {
       this.itemsRef.snapshotChanges().subscribe(items => resolve(items));
    });
  }

  getAll() {
    return this.itemsRef.snapshotChanges();
  }

  newObject(): Promise<any> {
    return new Promise(resolve => {
      resolve({ novo: true });
    });
  }

  retornaUm(id):any {
    return this.db.object( 'local/'+ id).valueChanges();
  }

  insere(obj){
    this.itemsRef.push(obj);
  }

}
