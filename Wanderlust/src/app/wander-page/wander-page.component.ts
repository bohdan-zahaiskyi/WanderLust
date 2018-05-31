import { Component, OnInit } from '@angular/core';
import {WandersService} from '../_services/wanders.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-wander-page',
  templateUrl: './wander-page.component.html',
  styleUrls: ['./wander-page.component.css']
})
export class WanderPageComponent implements OnInit {
  constructor(private _router: Router, private _wanderService: WandersService) { }
  wander: any;
  comments: any;
  commentActive: boolean;
  myComment: any;
  myEmail: any;
  isMyWander: boolean;
  isParticipant: boolean;

  leaveComment() {
    this.commentActive = true;
  }
  saveComment() {
    this.commentActive = false;
    this._wanderService.postComment(this.myComment).then(response => {
      this.comments.push(response.comment);
    });
  }
  cancelComment() {
    this.commentActive = false;
  }

  joinWander() {
    this.wander.participants.push(this.myEmail);
    this._wanderService.updateWander(this.wander).then(() => {
      this.isParticipant = true;
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
      let thisRoute = this._router.url;
      let n = thisRoute.lastIndexOf('/');
      thisRoute = thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
      n = thisRoute.lastIndexOf('/');
      thisRoute = thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
      this._router.navigateByUrl(thisRoute + '/wanders');
    });

  }

  ngOnInit() {
    this.commentActive = false;
    this.wander = {
      destinations: ['', ''],
      participants: ['']
    };
    this.myEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    this.comments = [];
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const thisId = thisRoute.substring(n + 1, thisRoute.length);
    this.myComment = {
      date: '2018-05-31',
      commentor: this.myEmail,
      wander: thisId
    };
    this._wanderService.getWanderById(thisId).then(data => {
      this.wander = data.wander[0];
      this.isMyWander = this.wander.initiator === this.myEmail;
      this.isParticipant = this.wander.participants.indexOf(this.myEmail) >= 0;
        this._wanderService.getWanderComments(this.wander._id).then(comments => {
        this.comments = comments.comments || [];
      });
    });
  }

}
