import { Injectable } from '@angular/core';
import {Wander } from '../_models/wander';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WandersService {
  wanders: Wander[];

  private apiKey = 'AIzaSyADudrY8m6yQESqXtAn0EY37abpnZ52Fjs'; // 'AIzaSyA7Yv0aWKwaU0GKSZ_bm1CJdhN5ZArMSkw';
  private apiUrl = 'http://localhost:3000/wanders';
  constructor(private http: Http) { }

  _sanitizeDestination(wander) {
    const sanitizedDestinations = [];
    wander.destinations.forEach(d => sanitizedDestinations.push(d.dest));
    return {...wander, destinations: sanitizedDestinations};
  }

  getPlace(name) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + name + '&key=' + this.apiKey).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getLatest() {
    return this.http.get(this.apiUrl + '/latest').toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getWanderById(id) {
    return this.http.get(this.apiUrl + '/' + id).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getInvited(email) {
    return this.http.get(this.apiUrl + '/invited/' + email).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getTopDestinations() {
    return this.http.get(this.apiUrl + '/topdestinations').toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  getWanders(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise()
      .then(data => {
        return this.handleData(data); })
      .catch(this.handleError);
  }

  deleteWander(id) {
    return this.http.delete(this.apiUrl + '/' + id).toPromise()
      .then(data => {this.handleData(data); })
      .catch(error => {this.handleError(error); });
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

  getWanderComments(wanderId) {
    return this.http.get(this.apiUrl + '/comments/' + wanderId).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  postComment(comment) {
    return this.http.post(this.apiUrl + '/comment', comment).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  updateWander(wanderObj) {
    let wander = wanderObj;
    if (wanderObj.destinations[0].dest) {wander = this._sanitizeDestination(wanderObj); }
    return this.http.put(this.apiUrl + '/update', wander).toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }

  saveWander(wanderObj) {
    let wander = wanderObj;
    if (wanderObj.destinations[0].dest) {wander = this._sanitizeDestination(wanderObj); }
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
