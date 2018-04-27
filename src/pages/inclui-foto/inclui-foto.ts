import { Camera, CameraOptions } from '@ionic-native/camera';
import { FotosProvider } from './../../providers/fotos/fotos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IncluiFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inclui-foto',
  templateUrl: 'inclui-foto.html',
})
export class IncluiFotoPage {

  local :any = {};
  listafotos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fotosProvider:FotosProvider, private camera: Camera) {
    this.local = this.navParams.data;

  }

  voltarPagina(){
    this.navCtrl.pop();
  }


  getFoto(tipo) {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:
      tipo == "picture"
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.listafotos.push("data:image/jpeg;base64," + imageData);
      },
      err => {
        // Handle error
        console.log(err);
      }
    );
  }

  apagaImagen(index){
    this.listafotos.splice(index,1);
  }

  salvarFotos(){
    if(this.listafotos.length>0){
      this.fotosProvider.uploadMulti(this.listafotos, this.local.payload.key);
    }
    this.navCtrl.pop();
  }

}
