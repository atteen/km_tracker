import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() data: any[] = [];
  
  // Options for the pie chart
  view: [number, number] = [700, 400]; // Size of the chart
  showLegend: boolean = true;
  showLabels: boolean = true;
  doughnut: boolean = false; // Set to true if you want a doughnut chart
  gradient: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {}

  ngOnInit(): void {}
}
