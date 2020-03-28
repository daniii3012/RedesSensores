import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherNow: any;

  hourChart: boolean = false;
  dayChart: boolean = false;
  weekChart: boolean = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getDataNow().subscribe(
      data => this.weatherNow = data
    )
  }

  showHourChart() {
    this.hourChart = true;
    this.dayChart = false;
    this.weekChart = false;
  }

  showDayChart() {
    this.hourChart = false;
    this.dayChart = true;
    this.weekChart = false;
  }

  showWeekChart() {
    this.hourChart = false;
    this.dayChart = false;
    this.weekChart = true;
  }

}
