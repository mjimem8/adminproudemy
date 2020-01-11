import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';
import { stringify } from 'querystring';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenASubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe();
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

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenASubir, this.usuario._id)
  }
}
