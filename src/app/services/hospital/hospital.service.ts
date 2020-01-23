import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import {map} from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
    
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarHospitales() {
    let url =  URL_SERVICES + '/hospital';

    return this.http.get(url)
    .pipe(
      map((response: any) => {
        this.totalHospitales = response.total;
        return response.hospitales;
      })
    );
  }

  obtenerHospitales(id: string) {
    let url =  URL_SERVICES + '/hospital/' + id;

    return this.http.get(url)
    .pipe(
      map((response: any) => response.hospital)
    );
  }

  borrarHospital(id: string){
    let url = URL_SERVICES + '/hospital/' +id;
    url+= '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .pipe(
      map(() => swal('Hospital Borrado', 'Eliminado correctamente', 'success'))
    );
  }

  crearHospital(nombre: string){
    let url = URL_SERVICES + '/hospital';
    url+= '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
    .pipe(
      map((response: any) => response.hospital)
    );
  }

  buscarHospital(termino: string){
    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
      .pipe(
        map((response:any) => {
          return response.hospitales;
        })
      );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url+= '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .pipe(
        map((response: any) => {
          swal('Hospital actualizado', hospital.nombre, 'success');
          return response.hospital;
        })
      );
  }
  
}
