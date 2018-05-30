import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.css']
})
export class UserPageComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    });
  }
}
