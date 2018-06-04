import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: '../user-page/user-profile/user-profile.component.html',
  styleUrls: ['../user-page/user-profile/user-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(private _userService: UserService) { }
  user: any;
  isMe = true;

  ngOnInit() {
    this._userService.getCurrentUser().then(user => {
      this.user = user;
    });
  }
}
