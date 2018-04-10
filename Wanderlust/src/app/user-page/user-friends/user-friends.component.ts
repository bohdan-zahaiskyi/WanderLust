import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  friends: any[];
  ngPopup = '';
  constructor(private userService: UserService) { }

  deleteFriend(): void {
    this.ngPopup = 'delete';
  }
  inviteFriend(): void {
    this.ngPopup = 'invite';
  }
  messageFriend(): void {
    this.ngPopup = 'message';
  }
  btnCancel(): void {
    this.ngPopup = '';
  }

  ngOnInit() {
    this.userService.getCurrentUserFriends().then( friends => {
      this.friends = friends;
      console.log(friends);
    });
  }
}
