import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public estaOculto: boolean = true;

  public notificacion = new EventEmitter<boolean>();

  constructor() { }


    ocultarModal() {
      this.estaOculto = true; 
      this.id = null;
      this.tipo = null;
    }

    mostrarModal(tipo: string, id: string) {
      this.estaOculto = false; 
      this.id = id;
      this.tipo = tipo;
    }
}
