import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlynkService {

  constructor(private http: HttpClient) { }

  tempData() {
    return this.http.get('https://blynk-cloud.com/ABjcs9HXc7bqmcu-Z0vaC2S3jLb1L_JU/get/V2');
  }

}
