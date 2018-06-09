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

  getChatMessages(chatId) {
    return this.http.get<any>(this.apiUrl + '/messages/' + chatId).toPromise();
  }

  getInterlocutor(chatId) {
    return this.http.get<any>(this.apiUrl + '/interlocutor/' + chatId + '/' + this._localService.getLocalUser().email).toPromise();
  }
  sendMessage(chatId, message) {
    return this.http.post<any>(this.apiUrl + '/message/' + chatId, message).toPromise();
  }
}
