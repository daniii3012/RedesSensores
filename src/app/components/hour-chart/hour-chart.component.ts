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
  maxTemp = 0;
  maxHumd = 0;
  minTemp = 0;
  minHumd = 0;
  data: any;
  i=0;

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

  findValues(){
    this.findMaxValueTemp();
    this.findMaxValueHumd();
    this.findMinValueTemp();
    this.findMinValueHumd();
  }

  findMaxValueTemp(){
    this.maxTemp = this.hourChart.data.datasets[0].data[0];
    this.i=0;
    for(this.i=1;this.i < this.hourChart.data.datasets[0].data.length;this.i++){
      if(this.hourChart.data.datasets[0].data[this.i] > this.maxTemp){
	      this.maxTemp = this.hourChart.data.datasets[0].data[this.i];
	    }
    }
  }

  findMaxValueHumd(){
    this.maxHumd = this.hourChart.data.datasets[1].data[0];
    this.i=0;
    for(this.i=1;this.i < this.hourChart.data.datasets[0].data.length;this.i++){
      if(this.hourChart.data.datasets[0].data[this.i] > this.maxHumd){
	      this.maxHumd = this.hourChart.data.datasets[0].data[this.i];
	    }
    }
  }

  findMinValueTemp(){
    this.minTemp = this.hourChart.data.datasets[0].data[0];
    this.i=0;
    for(this.i=1;this.i < this.hourChart.data.datasets[0].data.length;this.i++){
      if(this.hourChart.data.datasets[0].data[this.i] < this.minTemp){
	      this.minTemp = this.hourChart.data.datasets[0].data[this.i];
	    }
    }
  }

  findMinValueHumd(){
    this.minHumd = this.hourChart.data.datasets[1].data[0];
    this.i=0;
    for(this.i=1;this.i < this.hourChart.data.datasets[0].data.length;this.i++){
      if(this.hourChart.data.datasets[0].data[this.i] < this.minHumd){
	      this.minHumd = this.hourChart.data.datasets[0].data[this.i];
	    }
    }
  }
}
