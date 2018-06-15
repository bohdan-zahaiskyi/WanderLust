import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { User } from '../../_models/user';
import {Router} from '@angular/router';
import {LocalService} from '../../_services/local.service';
import {ChatService} from '../../_services/chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  messageText: string;
  user: any;
  isFriend: boolean;
  ngPopup = false;
  constructor(private _localService: LocalService,
              private _router: Router,
              private userService: UserService,
              private _chatService: ChatService) {}

  showMessage() {
    this.ngPopup = true;
  }
  btnCancel() {
    this.ngPopup = false;
  }

  get userAvatar() {
    return this.user.avatar;
  }

  sendMessage() {
    this.ngPopup = false;
    this._chatService.getChatByEmail(this.user.email).then(chat => {
      if (chat && chat._id) {
        const messageToSend = {
          chatId: chat._id,
          sender: this._localService.getLocalUser().email,
          date: this._localService.dateToString(new Date()),
          text: this.messageText
        };
        this._chatService.sendMessage(chat._id, messageToSend);
      } else {
        this._chatService.createChat(this.user.email).then(createdChat => {
          if (createdChat && createdChat._id) {
            const messageToSend = {
              chatId: createdChat._id,
              sender: this._localService.getLocalUser().email,
              date: this._localService.dateToString(new Date()),
              text: this.messageText
            };
            this._chatService.sendMessage(createdChat._id, messageToSend);
          }
        });
      }
    });
  }
  ngOnInit() {
    this.user = {};
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const userId = thisRoute.substring(n + 1, thisRoute.length);
    console.log(userId);
    this.userService.getUserById(userId).then(user => {
      user.avatar = (user.avatar && user.avatar !== '') ? user.avatar : '../../assets/images/users/bzahay.png';
      this.user = user;
      this.userService.getCurrentUser().then(me => {
        this.isFriend = me.friends.indexOf(this.user.email) > -1;
      });
    });
  }
}
