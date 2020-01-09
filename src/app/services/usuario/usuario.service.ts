import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import {map} from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  
    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token})
    .pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);  
      
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
        this.guardarStorage(response.id, response.token, response.usuario);  
  
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario)
    .pipe(
      map((response: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return response.usuario;
      })
    );
}

}