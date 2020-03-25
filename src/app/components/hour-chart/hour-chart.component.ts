import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-hour-chart',
  templateUrl: './hour-chart.component.html',
  styleUrls: ['./hour-chart.component.css']
})
export class HourChartComponent implements OnInit {

  hourChart = new Chart('hourChart', {});
  newNumbersT = [];
  newNumbersH = [];
  newDates = [];

  data: any;
  i:number = 0;
  j:number = 0;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getDataHour().subscribe(
      data_sensor => {
        let temp = data_sensor.map(res => res.temp)
        let humd = data_sensor.map(res => res.humd)
        let date = data_sensor.map(res => res.time)

        let weatherDates = []
        date.forEach((res) => {
          let jsdate = new Date(res.toMillis())
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        //console.log(weatherDates)

        this.hourChart = new Chart('hourChart', {
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
                  maxTicksLimit: 6,
                  reverse: true
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
    console.log("L: ", this.hourChart.data.datasets[0].data.length);
    while (this.i<(this.hourChart.data.datasets[0].data.length)/2){
      this.newNumbersH.push(this.hourChart.data.datasets[0].data[this.j]);
      this.newNumbersT.push(this.hourChart.data.datasets[1].data[this.j]);
      this.newDates.push(this.hourChart.data.labels[this.j]);
      this.j=this.j+2;
      this.i++;
    }
    
    this.hourChart.data.datasets[0].data=this.newNumbersH;
    this.hourChart.data.datasets[1].data=this.newNumbersT;
    this.hourChart.data.labels=this.newDates;
    
    
    this.hourChart.update();
    

    
    //LINEA SAGRADA DE CODIGO
    //console.log("Prueba: ", this.chart.data.datasets[0].data[0]);
  }

  changeDataMore(){
    if(this.hourChart.data.datasets[0].data.length>200&&this.hourChart.data.datasets[0].data.length<500){
      console.log("2");
    }
    if(this.hourChart.data.datasets[0].data.length>100&&this.hourChart.data.datasets[0].data.length<200){
      console.log("3");
    }
    if(this.hourChart.data.datasets[0].data.length>50&&this.hourChart.data.datasets[0].data.length<100){
      console.log("4");
    }
    if(this.hourChart.data.datasets[0].data.length>25&&this.hourChart.data.datasets[0].data.length<50){
      console.log("5");
    }
    if(this.hourChart.data.datasets[0].data.length>12&&this.hourChart.data.datasets[0].data.length<25){
      console.log("6");
    }
  }

}
