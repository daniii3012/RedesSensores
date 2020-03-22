import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dht22Data: any;
  mq135Data: any;

  data: any;

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit() {
    this.data = this.sensorService.getData();
    //this.getDHT22Data();
    //this.getMQ135Data();
  }

  /*
  getDHT22Data(){
    this.sensorService.getDHT22Data('data').subscribe(
      data => {
        this.dht22Data = data
        //console.log(this.dht22Data)
      }
    )
  }

  getMQ135Data(){
    this.sensorService.getMQ135Data('data').subscribe(
      data => {
        this.mq135Data = data
      }
    );
  }
  */

}
