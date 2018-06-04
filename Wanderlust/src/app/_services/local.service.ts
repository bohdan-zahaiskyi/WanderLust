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

}
