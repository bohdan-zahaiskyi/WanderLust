import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { User } from '../../_models/user';
import {Router} from '@angular/router';
import {LocalService} from '../../_services/local.service';
import {ChatService} from '../../_services/chat.service';
import {Observable} from 'rxjs/Observable';
import {WandersService} from '../../_services/wanders.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  messageText: string;
  user: any;
  me: any;
  comments: any;
  myComment: any;
  isFriend: boolean;
  showTab = 'comments';
  userWanders: any;
  ngPopup = false;
  constructor(private _localService: LocalService,
              private _router: Router,
              private userService: UserService,
              private _chatService: ChatService,
              private _wanderService: WandersService) {}

  showMessage() {
    this.ngPopup = true;
  }
  btnCancel() {
    this.ngPopup = false;
  }

  getCommentor(email) {
    this.userService.getUserByEmail(email).then(user => {
      this.comments.forEach((comment, index) => {
        if (comment.commentor === email) {
          this.comments[index].name = user.firstName + (user.lastName ? ' ' + user.lastName : '');
          this.comments[index].avatar = user.avatar;
          this.comments[index].personCompany = user.personCompany;
        }
      });
    });
  }

  get userAvatar() {
    return this.user.avatar;
  }
  chooseTab(tab) {
    this.showTab = tab;
    if (tab === 'comments') {
      document.getElementById('comments').classList.add('chosen');
      document.getElementById('wanders').classList.remove('chosen');
    } else if (tab === 'wanders') {
      document.getElementById('wanders').classList.add('chosen');
      document.getElementById('comments').classList.remove('chosen');
    }
  }

  addFriend() {
    this.me.friends.push(this.user.email);
    this.user.friendRequest.push(this.me.email);
    this.userService.updateUser(this.me).then(() => {
      this.userService.updateUser(this.user);
    });
  };

  sendMessage() {
    this.ngPopup = false;
    this._chatService.getChatByEmail(this.user.email).then(chat => {
      if (chat && chat._id) {
        const messageToSend = {
          chatId: chat._id,
          sender: this._localService.getLocalUser().email,
          date: this._localService.dateToString(new Date()),
          text: this.messageText
        };
        this._chatService.sendMessage(chat._id, messageToSend);
      } else {
        this._chatService.createChat(this.user.email).then(createdChat => {
          if (createdChat && createdChat._id) {
            const messageToSend = {
              chatId: createdChat._id,
              sender: this._localService.getLocalUser().email,
              date: this._localService.dateToString(new Date()),
              text: this.messageText
            };
            this._chatService.sendMessage(createdChat._id, messageToSend);
          }
        });
      }
    });
  }

  saveComment() {
    this.myComment.user = this.user._id;
   this.userService.postComment(this.myComment).then(response => {
     this.comments.push({
       ...response.comment,
       name: this.me.firstName + ' ' + this.me.lastName,
       avatar: this.me.avatar});
    });
  }

  ngOnInit() {
    this.user = {
      email: ''
    };
    this.me = {};
    this.comments = [];
    this.userWanders = [];
    this.myComment = {
      date: this._localService.dateToString(new Date()),
      commentor: this._localService.getLocalUser().email
    };
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const userId = thisRoute.substring(n + 1, thisRoute.length);
    console.log(userId);
    this.userService.getUserById(userId).then(user => {
      user.avatar = (user.avatar && user.avatar !== '') ? user.avatar : '../../assets/images/users/bzahay.png';
      this.user = user;
      this.userService.getCurrentUser().then(me => {
        this.isFriend = me.friends.indexOf(this.user.email) > -1;
      });
    }).then(() => {
      this.userService.getUserComments(this.user._id).then(comments => {
        this.comments = comments.comments || [];
        this.comments.forEach(c => {
          this.getCommentor(c.commentor);
        });
      });
    }).then(() => {
      this._wanderService.getMyWanders(this.user.email).then(data => {
        this.userWanders = {searchResults: data.filteredWanders || null};
      });
    });
    this.userService.getCurrentUser().then(me => {
      this.me = me;
    });
  }
}
