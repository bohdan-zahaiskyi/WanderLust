import { Injectable } from '@angular/core';
import { User } from './user';
import {Subject } from 'rxjs/Subject';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterService {
  constructor() {
  }
  private subject = new Subject<any>();

  sendData(data: any){
    this.subject.next(data);
  }
  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
