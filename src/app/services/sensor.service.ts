import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  sensorDHT22Collection: AngularFirestoreCollection<any>;
  sensorDHT22Doc: AngularFirestoreDocument<any>;
  sensorMQ135Doc: AngularFirestoreDocument<any>;
  sensorDHT22: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.sensorDHT22Collection = this.db.collection('dht22', order => order.orderBy("time", "asc").limit(2016));
  }

  
  getData(){
    return this.sensorDHT22Collection.snapshotChanges().pipe(map(
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
  /*
  getDHT22Data(id: string){
    this.sensorDHT22Doc = this.db.doc<any>(`dht22/${id}`);
    return this.sensorDHT22Doc.valueChanges();
  }

  getMQ135Data(id: string){
    this.sensorMQ135Doc = this.db.doc<any>(`mq135/${id}`);
    return this.sensorMQ135Doc.valueChanges();
  }
  */

}
