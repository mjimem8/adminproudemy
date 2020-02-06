import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}

  canActivate(): Promise<boolean> | boolean  {

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    
    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verficaRenueva(payload.exp);
  }

  verficaRenueva( fecha_expiracion: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let token_expiracion = new Date(fecha_expiracion * 1000);
      let ahora = new Date();

      //es la hora actual mas 1 horas
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      //mas de 1 horas para que expire
      if(token_expiracion.getTime() > ahora.getTime()) {
        resolve(true);    
      } else {
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve(true);
    });
  }

  expirado(fecha_expiracion: number){
    
    let ahora = new Date().getTime() / 1000;

    return fecha_expiracion < ahora;
  }


}
