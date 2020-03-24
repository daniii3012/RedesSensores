import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart = [];
  newNumbersT = [];
  newNumbersH = [];
  newDates = [];

  data: any;
  i=0;
  j=0;
  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit() {
    this.sensorService.getData().subscribe(
      data_sensor => {
        let temp = data_sensor.map(res => res.temp)
        let humd = data_sensor.map(res => res.humd)
        let date = data_sensor.map(res => res.time)

        let weatherDates = []
        date.forEach((res) => {
          let jsdate = new Date(res.toMillis())
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit' }))
        })

        //console.log(weatherDates)

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp,
                yAxisID: 'temp',
                borderColor: '#e6b41e',
                fill: false
              },
              {
                data: humd,
                yAxisID: 'humd',
                borderColor: '#148ac9',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7
                }
              }],
              yAxes: [{
                display: true,
                id: 'temp',
                ticks: {
                  beginAtZero: true,
                  max: 50
                }
              },
              {
                display: true,
                id: 'humd',
                ticks: {
                  beginAtZero: true,
                  max: 100
                }
              }]
            }
          }
        })
      }
    );
  }

  changeDataLess(){
    this.i=0;
    this.j=0;
    this.newNumbersH=[];
    this.newNumbersT=[];
    this.newDates=[];
    console.log("L: ", this.chart.data.datasets[0].data.length);
    while (this.i<(this.chart.data.datasets[0].data.length)/2){
      this.newNumbersH.push(this.chart.data.datasets[0].data[this.j]);
      this.newNumbersT.push(this.chart.data.datasets[1].data[this.j]);
      this.newDates.push(this.chart.data.labels[this.j]);
      this.j=this.j+2;
      this.i++;
    }
    
    this.chart.data.datasets[0].data=this.newNumbersH;
    this.chart.data.datasets[1].data=this.newNumbersT;
    this.chart.data.labels=this.newDates;
    
    
    this.chart.update();
    

    
    //LINEA SAGRADA DE CODIGO
    //console.log("Prueba: ", this.chart.data.datasets[0].data[0]);
  }

  changeDataMore(){
    if(this.chart.data.datasets[0].data.length>200&&this.chart.data.datasets[0].data.length<500){
      console.log("2");
    }
    if(this.chart.data.datasets[0].data.length>100&&this.chart.data.datasets[0].data.length<200){
      console.log("3");
    }
    if(this.chart.data.datasets[0].data.length>50&&this.chart.data.datasets[0].data.length<100){
      console.log("4");
    }
    if(this.chart.data.datasets[0].data.length>25&&this.chart.data.datasets[0].data.length<50){
      console.log("5");
    }
    if(this.chart.data.datasets[0].data.length>12&&this.chart.data.datasets[0].data.length<25){
      console.log("6");
    }
  }
}
