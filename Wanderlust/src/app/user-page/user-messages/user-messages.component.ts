import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {ChatService} from '../../_services/chat.service';
import {LocalService} from '../../_services/local.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css', '../user-wanders/user-wanders.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private _localService: LocalService, private _userService: UserService, private _chatService: ChatService, private _router: Router) { }
  chats: any;

  navigateToChat(id) {
    const thisRoute = this._localService.getCurrentRoute(this._router.url);
    this._router.navigateByUrl(thisRoute + '/chat/' + id);
  }
  getChatInterlocutor(chat) {
    const userEmail = this._localService.getLocalUser().email;
    return chat.comunicators[0] === userEmail ? chat.comunicators[1] : chat.comunicators[0];
  }

  ngOnInit() {
    this.chats = [];
    this._chatService.getUserChats().then(response => {
      this.chats = response;
      const userEmail = this._localService.getLocalUser().email;
      this.chats.forEach(chat => {
        chat.userName = '';
        const interlocutor = chat.comunicators[0] === userEmail ? chat.comunicators[1] : chat.comunicators[0];
        this._userService.getUserByEmail(interlocutor).then(user => {
          chat.userName = user.firstName + (user.lastName ? ' ' + user.lastName : '');
          chat.avatar = (user.avatar && user.avatar !== '') ? user.avatar : '../../assets/images/users/bzahay.png';
          chat.personCompany = user.personCompany;
        });
      });
    });
  }
}
