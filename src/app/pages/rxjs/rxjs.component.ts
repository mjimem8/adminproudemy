import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
  
  susbscription: Subscription;

  constructor() {
    //tiene 3 callback
    //primero cuando llega a next() y recibe el dato
    //segundo cuando es de error
    //tercero cuando termina la escucha

    this.susbscription = this.regresaObservable().pipe(
      //esto son las tuverias del observable
      //el observable se puede uilizar en este momento o al definir el observable
      //con retry lo que hacemos es intentar ejecutar un observable
      //y en caso de error ponemos el numeros de veces que queremos intentarlo de nuevo
      // ejemplo:
      // ejecución normal -> error , intento 1 -> ya funciona correctamente, no necesita hacer segundo intento
      retry(2)
    ).subscribe(
      numero => console.log("next", numero),
      error => console.log("error" , error),
      () => console.log("Terminó la escucha"),
    );
   }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.susbscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;  

      let intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if(contador === 3){
          clearInterval(intervalo);
          //con esto deja de escuchar el observable, en caso de no 
          //ponerlo estaria siempre escuchando aunque cambies de ruta
          observer.complete();
        }

      }, 1000);
    }
  ).pipe(
    //con map, transforma la respuesta a lo que deseamos
    //antes devolvia un objeto y ahora devuelve un elemento de ese objecto
    map( respuesta => respuesta.valor ),
    //el filter devuelve siempre true o false, sirve para filtrar los resultados
    //la respuesta viene ya mapeada
    filter((respuesta, index) => {
      let impar = (respuesta % 2) === 1;

      if (impar) {
        return true;
      } else {
        return false;
      }
    })
  );
  }
}
