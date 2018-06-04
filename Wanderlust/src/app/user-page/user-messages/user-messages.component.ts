import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {ChatService} from '../../_services/chat.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private _userService: UserService, private _chatService: ChatService) { }
  chats: any;

  ngOnInit() {
    this._chatService.getUserChats().then(response => {
      console.log(response);
      // this.chats = response;
    });
    this.chats = [
      {
        _id: '1',
        comunicators: [
          'bodyabest42@gmail.com',
          'olegPrylad@example.com'
        ]
      }
    ];
  }

}
