import { Component, OnInit } from '@angular/core';
import {WandersService} from '../_services/wanders.service';
import { Router} from '@angular/router';
import {LocalService} from '../_services/local.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-wander-page',
  templateUrl: './wander-page.component.html',
  styleUrls: ['./wander-page.component.css']
})
export class WanderPageComponent implements OnInit {
  constructor(private _userService: UserService, private _localService: LocalService, private _router: Router, private _wanderService: WandersService) { }
  wander: any;
  comments: any;
  commentActive: boolean;
  myComment: any;
  myEmail: any;
  user: any;
  isMyWander: boolean;
  isParticipant: boolean;
  isMyInvited: boolean;
  initiator: any;
  participants: any;

  leaveComment() {
    this.commentActive = true;
  }
  saveComment() {
    this.commentActive = false;
    this._wanderService.postComment(this.myComment).then(response => {
      this.comments.push({
        ...response.comment,
        name: this.user.firstName + ' ' + this.user.lastName,
        avatar: this.user.avatar});
    });
  }

  editWander() {
    const wanderId = this._localService.getRouteEnding(this._router.url);
    const thisRoute = this._localService.getCurrentRoute(this._localService.getCurrentRoute(this._router.url));
    this._router.navigateByUrl(thisRoute + '/editWander/' + wanderId);
  }

  getCommentor(email) {
    this._userService.getUserByEmail(email).then(user => {
      this.comments.forEach((comment, index) => {
        if (comment.commentor === email) {
          this.comments[index].name = user.firstName + ' ' + user.lastName;
          this.comments[index].avatar = user.avatar;
        }
      });
    });
  }

  cancelComment() {
    this.commentActive = false;
  }

  handleParticipant(participant) {
    this._userService.getUserByEmail(participant).then(user => {
      this.participants.push({
        name: user.firstName + ' ' + user.lastName,
        avatar: user.avatar
      });
    });
  }

  joinWander() {
    this.wander.participants.push(this.myEmail);
    const invitedIndex = this.wander.invited.indexOf(this.myEmail);
    if ( invitedIndex > -1) {
      this.wander.invited.splice(invitedIndex, 1);
    }
    this._wanderService.updateWander(this.wander).then(() => {
      this.isParticipant = true;
      this.isMyInvited = false;
    });
  }
  leaveWander() {
    const myIndex = this.wander.participants.indexOf(this.myEmail);
    if (myIndex >= 0) {
      this.wander.participants.splice(myIndex, 1);
      this._wanderService.updateWander(this.wander).then(() => {
        this.isParticipant = false;
      });
    }
  }
  deleteWander() {
    this._wanderService.deleteWander(this.wander._id).then(() => {
      let thisRoute = this._localService.getCurrentRoute(this._router.url);
      thisRoute = this._localService.getCurrentRoute(thisRoute);
      this._router.navigateByUrl(thisRoute + '/wanders');
    });

  }

  deleteInviteWander() {
    const myIndex = this.wander.invited.indexOf(this.myEmail);
    if (myIndex >= 0) {
      this.wander.invited.splice(myIndex, 1);
      this._wanderService.updateWander(this.wander).then(() => {
        this.isMyInvited = false;
      });
    }
  }

  ngOnInit() {
    this.participants = [];
    this.commentActive = false;
    this.initiator = {};
    this.wander = {
      destinations: ['', ''],
      participants: ['']
    };
    this.myEmail = this._localService.getLocalUser().email;
    this.user = {};
    this._userService.getCurrentUser().then(user => {
      this.user = user;
    });
    this.comments = [];
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const thisId = thisRoute.substring(n + 1, thisRoute.length);
    this.myComment = {
      date: this._localService.dateToString(new Date()),
      commentor: this.myEmail,
      wander: thisId
    };
    this._wanderService.getWanderById(thisId).then(data => {
      this.wander = data.wander[0];
      this.isMyWander = this.wander.initiator === this.myEmail;
      this.isParticipant = this.wander.participants.indexOf(this.myEmail) >= 0;
      this.isMyInvited = this.wander.invited.indexOf(this.myEmail) >= 0;
    }).then(() => {
        this._wanderService.getWanderComments(this.wander._id)
          .then(comments => {
            this.comments = comments.comments || [];
            this.comments.forEach(c => {
            this.getCommentor(c.commentor);
          });
        })
      .then(() => {
        this._userService.getUserByEmail(this.wander.initiator)
          .then(initiator => {
            this.initiator = {
              name: initiator.firstName + ' ' + initiator.lastName,
              avatar: initiator.avatar
            };
          });
        })
      .then(() => {
        this.wander.participants.forEach(participant => {
          this.handleParticipant(participant);
        });
      });
    });
  }

}
