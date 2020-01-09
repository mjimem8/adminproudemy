import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public route: Router){}

  canActivate() {
    if(this._usuarioService.estaLogueado()) {
      console.log("paso el guard");
      return true;
    } else {
      console.log("bloqueado el guard");
      this.route.navigate(['/login']);
      return false;
    }  
  }
  
}
