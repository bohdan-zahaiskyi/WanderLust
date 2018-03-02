import { Injectable } from '@angular/core';
import { User } from './registration';
import {Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users';


  addUser (user: User) {
    return this.httpClient.post<any>(this.apiUrl + '/insert', user, httpOptions).toPromise();
  }

  constructor(private httpClient: HttpClient) {}

  private subject = new Subject<any>();

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('');
    } else {
      console.error('');
    }

    return new ErrorObservable('');
  }
}
