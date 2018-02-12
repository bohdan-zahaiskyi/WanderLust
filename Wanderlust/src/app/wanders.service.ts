import { Injectable } from '@angular/core';
import {Wander, PickUp, Aim} from './wander';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WandersService {
  w1: Wander = {
    aim : Aim.Cities,
    budget : 200,
    destinations : ["Rome", "Paris"],
    people : 4,
    id : 1,
    description : "",
    pickUp : PickUp.Hitchhike,
    startDate : "26.05.2018",
    endDate : "30.05.2018"
  };
    w2: Wander = {
    aim : Aim.NatureLandscapes,
    budget : 20,
    destinations : ["Lviv", "Hoverla"],
    people : 4,
    id : 2,
    description : "",
    pickUp : PickUp.TrainBus,
    startDate : "11.03.2018",
    endDate : "14.03.2018"
  };
  wanders: Wander[] = [this.w1, this.w2];

  private apiUrl= "http://localhost:3000/api";
  constructor(private http: Http) { }
  getLocalWanders(): Wander[]{
    return this.wanders;
  };
  getWanders(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise()
      .then(this.handleData)
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
