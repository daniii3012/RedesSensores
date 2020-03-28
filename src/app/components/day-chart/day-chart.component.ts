import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.css']
})
export class DayChartComponent implements OnInit {

  dayChart = new Chart('dayChart', {});

  maxTemp:number = 0;
  maxHumd:number = 0;
  minTemp:number = 0;
  minHumd:number = 0;

  minDate: any;
  maxDate: any;

  i:number = 0;

  moreInfo: boolean = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getDataDay().subscribe(
      data_sensor => {
        let temp = data_sensor.map(res => res.temp.toFixed(2))
        let humd = data_sensor.map(res => res.humd.toFixed(2))
        let date = data_sensor.map(res => res.time)

        let weatherDates = []
        date.forEach((res) => {
          let jsdate = new Date(res.toMillis())
          weatherDates.push(jsdate.toLocaleTimeString('es-CO', { weekday: 'long', day: 'numeric', hour: '2-digit' }))
        })

        //console.log(weatherDates)

        this.dayChart = new Chart('dayChart', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp,
                yAxisID: 'temp',
                borderColor: '#e6b41e',
                fill: true,
                backgroundColor: '#e6b41e2a',
                label: 'Temperatura'
              },
              {
                data: humd,
                yAxisID: 'humd',
                borderColor: '#148ac9',
                fill: true,
                backgroundColor: '#148ac92a',
                label: 'Humedad'
              }
            ]
          },
          options: {
            tooltips: {
              mode: 'x'
            },
            elements: {
              line: {
                tension: 0
              }
            },
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 6,
                  reverse: true,
                  fontSize: 12
                }
              }],
              yAxes: [{
                display: true,
                id: 'temp',
                ticks: {
                  suggestedMin: 10,
                  suggestedMax: 40,
                  fontColor: '#e6b41e'
                }
              },
              {
                display: true,
                id: 'humd',
                position: 'right',
                ticks: {
                  suggestedMin: 20,
                  suggestedMax: 80,
                  fontColor: '#148ac9'
                }
              }]
            }
          }
        });

        this.findDates();
      }
    );
  }

  findValues(){
    this.moreInfo = !this.moreInfo;
    this.findMaxValueTemp();
    this.findMaxValueHumd();
    this.findMinValueTemp();
    this.findMinValueHumd();
  }

  findDates(){
    this.minDate = this.dayChart.data.labels[0];
    this.maxDate = this.dayChart.data.labels[this.dayChart.data.labels.length - 1];
  }

  findMaxValueTemp(){
    this.maxTemp = this.dayChart.data.datasets[0].data[0];
    this.i=0;
    for(this.i=1;this.i < this.dayChart.data.datasets[0].data.length;this.i++){
      if(this.dayChart.data.datasets[0].data[this.i] > this.maxTemp){
	      this.maxTemp = this.dayChart.data.datasets[0].data[this.i];
	    }
    }
  }

  findMaxValueHumd(){
    this.maxHumd = this.dayChart.data.datasets[1].data[0];
    this.i=0;
    for(this.i=1;this.i < this.dayChart.data.datasets[1].data.length;this.i++){
      if(this.dayChart.data.datasets[1].data[this.i] > this.maxHumd){
	      this.maxHumd = this.dayChart.data.datasets[1].data[this.i];
	    }
    }
  }

  findMinValueTemp(){
    this.minTemp = this.dayChart.data.datasets[0].data[0];
    this.i=0;
    for(this.i=1;this.i < this.dayChart.data.datasets[0].data.length;this.i++){
      if(this.dayChart.data.datasets[0].data[this.i] < this.minTemp){
	      this.minTemp = this.dayChart.data.datasets[0].data[this.i];
	    }
    }
  }

  findMinValueHumd(){
    this.minHumd = this.dayChart.data.datasets[1].data[0];
    this.i=0;
    for(this.i=1;this.i < this.dayChart.data.datasets[1].data.length;this.i++){
      if(this.dayChart.data.datasets[1].data[this.i] < this.minHumd){
	      this.minHumd = this.dayChart.data.datasets[1].data[this.i];
	    }
    }
  }
}
