import { Injectable } from '@angular/core';
import { User } from './user';
import {Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users';
  private subject = new Subject<any>();

  addUser (user: User) {
    user.password = Md5.hashStr(user.password) as string;
    return this.httpClient.post<any>(this.apiUrl + '/verifyEmail', user, httpOptions).toPromise();
  }

  confirmUser(id) {
    return this.httpClient.put<any>(this.apiUrl + '/confirm', id, httpOptions).toPromise();
  }

  emailExist(email) {
    return this.httpClient.get<any>(this.apiUrl + '/emailExist/' + email, httpOptions).toPromise();
  }
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
