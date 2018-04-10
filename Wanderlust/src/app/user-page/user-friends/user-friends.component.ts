import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  friends: any[];
  ngPopup = false;
  constructor(private userService: UserService) { }

  deleteFriend(): void {
    this.ngPopup = true;
  }
  inviteFriend(): void {
    this.ngPopup = true;
  }
  messageFriend(): void {
    this.ngPopup = true;
  }
  btnCancel(): void {
    this.ngPopup = false;
  }

  ngOnInit() {
    this.userService.getCurrentUserFriends().then( friends => {
      this.friends = friends;
      console.log(friends);
    });
  }
}
