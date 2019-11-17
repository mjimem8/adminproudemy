import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donna',
  templateUrl: './grafico-donna.component.html',
  styles: []
})
export class GraficoDonnaComponent implements OnInit {

  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartType') doughnutChartType: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
