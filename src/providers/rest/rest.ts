import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
apiUrl = 'http://localhost:5000';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
	sendDatos(data) {
  		return new Promise((resolve, reject) => {
    	this.http.post(this.apiUrl+'/api/Service', JSON.stringify(data))
      	.subscribe(res => {
        	resolve(res);
      	}, (err) => {
        	reject(err);
      		});
  		});
	}
  traerDatos() {
      return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/api/Service2')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
          });
      });
  }
}
