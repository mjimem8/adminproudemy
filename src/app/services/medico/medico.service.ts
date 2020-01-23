import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICES + '/medico';

    return this.http.get(url)
      .pipe(
        map((response: any) => {
            this.totalMedicos = response.total;

            return response.medicos;
        })
      );
  }

  buscarMedicos(termino: string){
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
      .pipe(
        map((response:any) => {
          return response.medicos;
        })
      );
  }

  cargarMedico(id: string) {
    let url = URL_SERVICES + '/medico/' + id;

    return this.http.get(url)
      .pipe(
        map((response: any) => {
          return response.medico;
        })
      );
  }

  borrarMedico(id: string){
    let url = URL_SERVICES + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .pipe(
      map(response => {
        swal('Médico borrado', ' Médico borrado correctamente', 'success')
        return response;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICES + '/medico';
  
    if (medico._id) {
      //actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
  
      return this.http.put(url, medico)
        .pipe(
          map((response: any) => {

            swal('Médico actualizado', medico.nombre, 'success');
            return response.medico;
          })
        );

    } else {
      //creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
        .pipe(
          map((response: any) => {
  
            swal('Médico creado', medico.nombre, 'success');
            return response.medico;
          })
        );
    }    
  }

}
