import { Injectable } from '@angular/core';
import {Wander } from '../_models/wander';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WandersService {
  wanders: Wander[];

  private apiUrl = 'http://localhost:3000/wanders';
  constructor(private http: Http) { }

  _sanitizeDestination(wander) {
    const sanitizedDestinations = [];
    wander.destinations.forEach(d => sanitizedDestinations.push(d.dest));
    return {...wander, destinations: sanitizedDestinations};
  }

  getWanderById(id) {
    return this.http.get(this.apiUrl + '/' + id).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getWanders(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise()
      .then(data => {
        return this.handleData(data); })
      .catch(this.handleError);
  }

  getMyWanders(email) {
    return this.http.post(this.apiUrl + '/my', {email}).toPromise()
      .then(data => this.handleData(data))
      .catch(error => this.handleError(error));
  }

  searchWanders(params): Promise<any> {
    return this.http.post(this.apiUrl + '/search', params).toPromise()
      .then(data => this.handleData(data))
      .catch(error => this.handleError(error));
  }

  saveWander(wanderObj) {
    const wander = this._sanitizeDestination(wanderObj);
    return this.http.post(this.apiUrl + '/create', wander)
      .toPromise()
      .then(data => {
        return data;
      })
      .catch(this.handleError);
  }
  private handleData (res: any) {
    const body = res.json();
    console.log(body);
    return body || {};
  }
  private handleError (error: any) {
    return Promise.reject(error.message || error);
  }
}