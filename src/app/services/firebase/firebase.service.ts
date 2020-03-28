import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  sensorDHT22Collection: AngularFirestoreCollection<any>;
  sensorDHT22Doc: AngularFirestoreDocument<any>;
  sensorMQ135Doc: AngularFirestoreDocument<any>;
  sensorDHT22: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    //this.sensorDHT22Collection = this.db.collection('dht22', order => order.orderBy("time", "desc").limit(12/*2016*/));
  }

  getDataNow(){
    return this.db.collection('dht22', order => order.orderBy("time", "desc").limit(1)).snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ));
  }

  
  getDataHour(){
    return this.db.collection('dht22', order => order.orderBy("time", "desc").limit(24)).snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ));
  }
  
  getDataDay(){
    return this.db.collection('dht22_day', order => order.orderBy("time", "desc").limit(24)).snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ));
  }

  getDataWeek(){
    return this.db.collection('dht22_week', order => order.orderBy("time", "desc").limit(14)).snapshotChanges().pipe(map(
      actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          }
        )
      }
    ));
  }

}
