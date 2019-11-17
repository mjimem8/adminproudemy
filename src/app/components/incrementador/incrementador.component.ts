import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  
  //para obtener elemento de la vista
  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;
  //@input -> para recibir variables
  //nombre se llama desde fuera del componente y leyenda es el nombre 
  // de la variable internamente
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  //@ouput -> manda variables donde se declare el componente
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter;
  constructor() { 
  }

  ngOnInit() {
  }

  onChanges(newValue: number){

    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <=0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number){

    if(this.progreso >= 100 && valor > 0){
      return;
    }

    if(this.progreso <= 0 && valor < 0){
      return;
    }
    
    this.progreso += valor; 
  
    //emite el EventEmitter
    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
