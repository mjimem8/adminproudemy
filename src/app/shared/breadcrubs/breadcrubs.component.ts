import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrubs',
  templateUrl: './breadcrubs.component.html',
  styles: []
})
export class BreadcrubsComponent implements OnInit {
  titulo: string;

  constructor(private router: Router, 
              private title: Title,
              private meta: Meta) {

      this.getDataRoute()
      .subscribe(data => {
        this.titulo = data.titulo;
        //con title ponemos el nombre del titulo de la pagina que nos encontramos a la pestaña
        this.title.setTitle(this.titulo);

        //creamos un etiqueta meta para el html con el titulo 
        const metaTag: MetaDefinition = {
          name: 'descipción',
          content: this.titulo
        };

        this.meta.updateTag(metaTag);
      });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      //filtra por tipo de eventos y con map obtiene el data de dicho evento
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
