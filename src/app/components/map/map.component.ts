import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Mapboxgl.Map;

  constructor() { }

  ngOnInit() {
    Mapboxgl.accessToken = environment.mapboxKey;

    this.map = new Mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.0961825, 4.6357964], // starting position
      zoom: 12, // starting zoom
      interactive: false
    });

    this.map.scrollZoom.disable();

    this.marker();
  }

  marker() {
    const marker = new Mapboxgl.Marker({
      draggable: false,
      color: '#49e9e1'
      })
      .setLngLat([-74.0961825, 4.6357964])
      .addTo(this.map);
  }

}
