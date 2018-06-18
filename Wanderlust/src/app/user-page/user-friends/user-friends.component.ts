import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import {LocalService} from '../../_services/local.service';
import {WandersService} from '../../_services/wanders.service';
import { ChatService } from '../../_services/chat.service';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {
  user: any;
  friends = [];
  requestedFriends = [];
  friendAction: any;
  ngPopup = '';
  searchKeyword: '';
  searchResult: any;
  myWanders: any;
  wanderToInvite: any;
  messageText: string;
  constructor(private _localService: LocalService,
              private _router: Router,
              private _chatService: ChatService,
              private userService: UserService,
              private _wanderService: WandersService) { }

  deleteFriend(friend: any): void {
    this.ngPopup = 'delete';
    this.friendAction = friend;
  }
  inviteFriend(friend: any): void {
    this.friendAction = friend;
    this._wanderService.getMyWanders(this._localService.getLocalUser().email).then(wanders => {
      this.myWanders = wanders.filteredWanders;
      this.ngPopup = 'invite';
    });
  }
  messageFriend(friend: any): void {
    this.ngPopup = 'message';
    this.friendAction = friend;
  }

  hideResults() {
    this.searchResult = [];
  }

  btnCancel(): void {
    this.ngPopup = '';
    this.friendAction = {};
  }
  btnSend(): void {
    this.ngPopup = '';
    this._chatService.getChatByEmail(this.friendAction.email).then(chat => {
      if (chat && chat._id) {
        const messageToSend = {
          chatId: chat._id,
          sender: this.user.email,
          date: this._localService.dateToString(new Date()),
          text: this.messageText
        };
        this._chatService.sendMessage(chat._id, messageToSend);
      } else {
        this._chatService.createChat(this.friendAction.email).then(createdChat => {
          if (createdChat && createdChat._id) {
            const messageToSend = {
              chatId: createdChat._id,
              sender: this.user.email,
              date: this._localService.dateToString(new Date()),
              text: this.messageText
            };
            this._chatService.sendMessage(createdChat._id, messageToSend);
          }
        });
      }
    });
  }
  btnInvite(): void {
    console.log(this.wanderToInvite);
    console.log(this.friendAction.email);
    this._wanderService.getWanderById(this.wanderToInvite).then(wander => {
      if (wander && wander.wander) {
        wander.wander[0].invited.push(this.friendAction.email);
        this._wanderService.updateWander(wander.wander[0]);
      }
    });
    this.ngPopup = '';
  }
  btnDelete(): void {
    this.userService.deleteFriend(this.friendAction.email).then(res => {
      this.friends = [];
      res.forEach(friendEmail => {
        this.userService.getUserByEmail(friendEmail).then(result => {
          this.friends.push(result);
        });
      });
    });
    this.ngPopup = '';
  }
  addResult(result) {
    this.user.friends.push(result.email);
    this.userService.updateUser(this.user).then(() => {
          this.friends.push(result);
    }).then(() => {
      this.userService.getUserByEmail(result.email).then(user => {
        user.friendRequest = user.friendRequest || [];
        user.friendRequest.push(this.user.email);
        this.userService.updateUser(user);
      });
    });
  }

  goToProfile(id) {
    this._router.navigateByUrl(this._localService.getCurrentRoute(this._router.url) + '/profile/' + id);
  }

  addRequest(request) {
    const index = this.user.friendRequest.indexOf(request.email);
    if (index > -1) {
      this.user.friendRequest.splice(index, 1);
    }
    this.user.friends.push(request.email);
    this.userService.updateUser(this.user).then(() => {
      this.friends.push(request);
      this.requestedFriends = [];
      this.user.friendRequest.forEach(frinedEmail => {
        this.userService.getUserByEmail(frinedEmail).then(result => {
          result.avatar = result.avatar || '../../../assets/images/users/bzahay.png';
          this.requestedFriends.push(result);
        });
      });
    });
  }

  deleteRequest(request) {
    const index = this.user.friendRequest.indexOf(request.email);
    if (index > -1) {
      this.user.friendRequest.splice(index, 1);
      this.userService.updateUser(this.user);
    }
  }

  hideResult(result) {

  }

  performSearch() {
    this.userService.searchUser(this.searchKeyword)
      .then(result => {
        this.searchResult = result.result;
        console.log(result);
      })
      .catch(console.log);
  }

  ngOnInit() {
    this.friendAction = {};
    this.myWanders = [];
    this.userService.getCurrentUser().then( user => {
      this.user = user;
      this.user.friends.forEach(frinedEmail => {
        this.userService.getUserByEmail(frinedEmail).then(result => {
          result.avatar = result.avatar || '../../../assets/images/users/bzahay.png';
          this.friends.push(result);
        });
      });
      if (this.user.friendRequest) {
        this.user.friendRequest.forEach(frinedEmail => {
          this.userService.getUserByEmail(frinedEmail).then(result => {
            result.avatar = result.avatar || '../../../assets/images/users/bzahay.png';
            this.requestedFriends.push(result);
          });
        });
      }
    });
  }
}
