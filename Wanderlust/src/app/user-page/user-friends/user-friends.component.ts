import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  friends: any[];
  friendAction: any;
  ngPopup = '';
  constructor(private userService: UserService) { }

  deleteFriend(friend: any): void {
    this.ngPopup = 'delete';
    this.friendAction = friend;
  }
  inviteFriend(friend: any): void {
    this.ngPopup = 'invite';
    this.friendAction = friend;
  }
  messageFriend(friend: any): void {
    this.ngPopup = 'message';
    this.friendAction = friend;
  }
  btnCancel(): void {
    this.ngPopup = '';
    this.friendAction = null;
  }
  btnSend(): void {
    this.ngPopup = '';
  }
  btnInvite(): void {
    this.ngPopup = '';
  }
  btnDelete(): void {
    this.userService.deleteFriend(this.friendAction.email).then(res=>{
      console.log(res);
    });
    this.ngPopup = '';
  }

  ngOnInit() {
    this.userService.getCurrentUserFriends().then( friends => {
      this.friends = friends;
      console.log(friends);
    });
  }
}
