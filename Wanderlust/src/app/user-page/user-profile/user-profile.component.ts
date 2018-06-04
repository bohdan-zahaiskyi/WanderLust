import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { User } from '../../_models/user';
import {Router} from '@angular/router';
import {LocalService} from '../../_services/local.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = new User();
  isFriend: boolean;
  constructor(private _localService: LocalService, private _router: Router, private userService: UserService) {}

  ngOnInit() {
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const userId = thisRoute.substring(n + 1, thisRoute.length);
    console.log(userId);
    this.userService.getUserById(userId).then(user => {
      this.user = user;
      this.userService.getCurrentUser().then(me => {
        this.isFriend = me.friends.indexOf(this.user.email) > -1;
      });
    });
  }
}
