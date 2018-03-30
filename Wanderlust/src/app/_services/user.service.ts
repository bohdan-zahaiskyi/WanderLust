import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private email = '';
  constructor(_authentification: AuthenticationService, private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    const parsed = user.split('"');
    this.email = parsed[3];
  }

  getCurrentUser() {
    return this.http.get<any>(this.apiUrl + '/' + this.email, httpOptions).toPromise();
  }
  getCurrentUserFriends() {
    return this.http.get<any>(this.apiUrl + '/' + this.email + '/friends', httpOptions).toPromise();
  }
}
