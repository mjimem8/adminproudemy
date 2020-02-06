import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICES + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
    .pipe(
      map((response: any) => {

        this.token = response.token;
        localStorage.setItem('token', this.token);
        console.log('Token renovado');

        return true;
      }),
      catchError(err => {

        this.router.navigate(['/login']);
        swal('No se pudo renovar token', 'No fué posible renovar token', 'error');

        throw err;
      })
    );
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token})
    .pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario, response.menu);  
      
        return true;
      })
    );
  }
  
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';

    return this.http.post(url, usuario)
    .pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario, response.menu);  
  
        return true;
      }),
      catchError(err =>  {

        swal('Error en el login', err.error.mensaje, 'error');
        throw err;
      })
    )
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario)
    .pipe(
      map((response: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return response.usuario;
      }),
      catchError(err =>  {

        swal(err.error.mensaje, err.error.errors.message, 'error');
        throw err;
      })
    );
}

actualizarUsuario(usuario: Usuario){
  let url = URL_SERVICES + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

  return this.http.put(url, usuario)
  .pipe(
    map((response: any) => {

      if(usuario._id == this.usuario._id) {
        let usuarioDB: Usuario = response.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);  
      }

      
      swal('Usuario actualizado', usuario.nombre, 'success');
      
      return true;
    }),
    catchError(err =>  {

      swal(err.error.mensaje, err.error.errors.message, 'error');
      throw err;
    })
  );
}

cambiarImagen(file: File, id: string) {

  this._subirArchivoService.subirArchivo(file, 'usuarios', id)
  .then((response: any) => {
  
    this.usuario.img = response.usuario.img;
  
    swal('Imagen actualizada', this.usuario.nombre, 'success');
    this.guardarStorage(id, this.token, this.usuario, this.menu);
  
  }).catch(response => {
    console.log(response);
  });

}

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICES + '/usuario?desde=' + desde;
  
    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
      .pipe(
        map((response:any) => {
          return response.usuarios;
        })
      );
  }

  borrarUsuario(id: string){
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
        map(response => {
          swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
          return true;
        })
      );
  }
}