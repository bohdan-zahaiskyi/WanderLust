import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  friends: any[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserFriends().then( friends => {
      this.friends = friends;
      console.log(friends);
    });
  }

}
