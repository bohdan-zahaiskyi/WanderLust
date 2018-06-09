import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {
  constructor() {}

  getLocalUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getCurrentRoute(thisRoute) {
    const n = thisRoute.lastIndexOf('/');
    return thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
  }

  getRouteEnding(thisRoute) {
    const n = thisRoute.lastIndexOf('/');
    return thisRoute.substring(n + 1, thisRoute.length);
  }

  dateToString(currentdate) {
    const datetime = currentdate.getFullYear() + '-'
      + (currentdate.getMonth() < 9 ? '0' : '') + (currentdate.getMonth() + 1)  + '-'
      + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + 'T'
      + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ':'
      + (currentdate.getMinutes() < 10 ? '0' : '' ) + currentdate.getMinutes();

    return datetime;
  }
}
