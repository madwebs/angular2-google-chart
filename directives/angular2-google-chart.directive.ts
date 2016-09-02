import {Directive,ElementRef,Input,OnInit} from '@angular/core';

declare var google:any;
declare var googleLoaded:any;

@Directive({
  selector: '[GoogleChart]'
})
export class GoogleChart implements OnInit {
  public _element:any;
  @Input('chartType') public chartType:string;
  @Input('chartOptions') public chartOptions: Object;
  @Input('chartData') public chartData: Object;
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    if(!googleLoaded) {
      googleLoaded = true;
    google.charts.load('current', {'packages':['corechart', 'gauge']});
     }
    setTimeout(() =>this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element));
  }
  drawGraph (chartOptions : any,chartType : any,chartData : any,ele : any) {
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var wrapper : any;
       wrapper = new google.visualization.ChartWrapper({
             chartType: chartType,
             dataTable:chartData ,
             options:chartOptions || {},
             containerId: ele.id
           });

          if(chartType == 'GeoChart' || chartType == 'LineChart') {
              let dataTable:any = wrapper.getDataTable();

              let formatter : any = new google.visualization.NumberFormat({
                  suffix : " €"
              });

              formatter.format(dataTable, 1);
               
              wrapper.setDataTable(dataTable);
          }

      wrapper.draw();
    }
  }
}

