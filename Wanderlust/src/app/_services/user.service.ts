import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalService} from './local.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private email = '';
  constructor(_authentification: AuthenticationService, private http: HttpClient, private _localService: LocalService) {
    const user = _localService.getLocalUser();
    if (user) {
      this.email = user.email;
    }
  }

  updateUser(updatedUser) {
    return this.http.put<any>(this.apiUrl + '/update', updatedUser).toPromise();
  }

  getUserByEmail(email) {
    return this.http.get<any>(this.apiUrl + '/email/' + email).toPromise();
  }

  searchUser(keyword) {
    return this.http.get<any>(this.apiUrl + '/search/' + keyword).toPromise();
  }
  getCurrentUser() {
    return this.http.get<any>(this.apiUrl + '/email/' + this.email, httpOptions).toPromise();
  }
  getUserById(id) {
    return this.http.get<any>(this.apiUrl + '/' + id).toPromise();
  }
  getCurrentUserFriends() {
    return this.http.get<any>(this.apiUrl + '/' + this.email + '/friends', httpOptions).toPromise();
  }
  deleteFriend(friendEmail: string) {
    const body = {
      myEmail: this.email,
      friendEmail: friendEmail
    };
    // return this.http.put<any>(this.apiUrl + '/' + this.email + '/deleteFriend', friendEmail, httpOptions).toPromise();
    return this.http.put<any>(this.apiUrl + '/deleteFriend', body, httpOptions).toPromise();
  }
}
