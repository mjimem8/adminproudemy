import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenASubir = null;
    this.imagenTemporal = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File){
    if (!archivo) {
      this.imagenASubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenASubir = null;
      return;
    }

    this.imagenASubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenASubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then((response: any) => {
      this._modalUploadService.notificacion.emit(response);
      this.cerrarModal();
    })
    .catch(error => {
      console.log('Error en la carga...');
    });
  }

}
