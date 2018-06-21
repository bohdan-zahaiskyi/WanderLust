import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {WandersService} from '../_services/wanders.service';
import {ChatService} from '../_services/chat.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.css']
})
export class UserPageComponent implements OnInit {

  user: any;
  invited = 0;
  newFriends = 0;
  messages = 0;

  constructor(private userService: UserService, private _wanderService: WandersService) {
  }

  removeIcon() {
    this.invited = 0;
  }
  removeFr() {
    this.newFriends = 0;
  }

  ngOnInit() {
    this.user = {};
    this.userService.getCurrentUser().then(user => {
      this.user = user;
      this.newFriends = user.friendRequest.length || 0;
    }).then(() => {
      this._wanderService.getInvited(this.user.email).then(data => {
        this.invited = data.length;
      });
    });
  }
}
