import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UserService} from '../../_services/user.service';
import {User} from '../../_models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = new User();
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    });
  }
}
