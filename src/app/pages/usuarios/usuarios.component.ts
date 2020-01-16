import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioServices: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe(response => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioServices.cargarUsuarios(this.desde)
    .subscribe((response: any) => {
      this.totalRegistros = response.total;
      this.usuarios = response.usuarios;
      this.cargando = false;
    });

  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    
    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }


    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioServices.buscarUsuarios(termino)
    .subscribe(usuarios => {
      this.usuarios = usuarios;
      this.cargando = false;
    });

  }

  borrarUsuario(usuario: Usuario) {
    
    if(usuario._id == this._usuarioServices.usuario._id){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Esta a punto de borrar a '+ usuario.nombre,
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    }).then(borrar => {
        if (borrar) {
          this._usuarioServices.borrarUsuario(usuario._id)
            .subscribe(repsonse => {
              this.cargarUsuarios();
            });
        }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioServices.actualizarUsuario(usuario)
      .subscribe();
  }

}
