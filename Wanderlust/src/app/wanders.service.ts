import { Injectable } from '@angular/core';
import {Wander, PickUp, Aim} from './wander';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WandersService {
  wanders: Wander[];

  private apiUrl= "http://localhost:3000/api";
  constructor(private http: Http) { }
  getWanders(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise()
      .then(data => 
        {return this.handleData(data)})
      .catch(this.handleError);
  }
  private handleData (res: any){
    let body = res.json();
    console.log(body);
    return body || {};
  };
  private handleError (error: any){
    return Promise.reject(error.message || error);
  }
}
