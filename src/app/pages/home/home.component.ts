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

  data: any;

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
          let jsdate = res
          weatherDates.push(jsdate.toDate())
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
                display: true
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

}
