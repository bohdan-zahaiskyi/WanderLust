import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalService} from './local.service';

@Injectable()
export class ChatService {
  constructor(private _localService: LocalService, private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/chats';

  getUserChats() {
    return this.http.get<any>(this.apiUrl + '/' + this._localService.getLocalUser().email).toPromise();
  }
}
