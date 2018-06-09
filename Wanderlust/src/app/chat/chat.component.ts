import { Component, OnInit } from '@angular/core';
import {ChatService} from '../_services/chat.service';
import {LocalService} from '../_services/local.service';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {P} from '@angular/core/src/render3';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private _chatService: ChatService, private _localService: LocalService, private _userService: UserService, private _router: Router) { }
  messages = [];
  chatId: string;
  userEmail: string;
  interlocutor = {};
  messageToSend: any;

  sendMessage() {
    if (this.messageToSend.text && this.messageToSend.text.trim() !== '') {
      this.messageToSend.date = this._localService.dateToString(new Date());
      this._chatService.sendMessage(this.chatId, this.messageToSend).then(response => {
        if (response.success) {
          this.messages.push(this.messageToSend);
        }
        this.messageToSend = {
          chatId: this.chatId,
          sender: this.userEmail
        };
      }).catch(error => {
        console.log(error);
        this.messageToSend = {
          chatId: this.chatId,
          sender: this.userEmail
        };
      });
    }
  }

  ngOnInit() {
    this.userEmail = this._localService.getLocalUser().email;
    this.chatId = this._localService.getRouteEnding(this._router.url);
    this.messageToSend = {
      chatId: this.chatId,
      sender: this.userEmail
    };
    this._chatService.getChatMessages(this.chatId)
      .then(messages => {
        this.messages = messages;
      });
    this.interlocutor = this._chatService.getInterlocutor(this.chatId).then(user => {
      this.interlocutor = user;
    });
  }
}
