import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import { Md5} from 'ts-md5';

@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/authenticate', { email: email, password: Md5.hashStr(password) })
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        const token = response && response.token;
        const id = response && response.id;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token}));

          // return true to indicate successful login
          return {
            success: true,
            id: id
          };
        } else {
          // return false to indicate failed login
          return null;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
