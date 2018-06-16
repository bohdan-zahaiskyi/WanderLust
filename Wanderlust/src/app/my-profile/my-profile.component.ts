import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {LocalService} from '../_services/local.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: '../user-page/user-profile/user-profile.component.html',
  styleUrls: ['../user-page/user-profile/user-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(private _userService: UserService, private _localService: LocalService) { }
  user: any;
  isMe = true;
  avaPopup = false;
  comments: any;

  get userAvatar() {
    if (this.user.avatar && this.user.avatar !== '') {
      return this.user.avatar;
    }
    return '../../assets/images/users/bzahay.png';
  }

  uploadAva() {
    this.user.avatar = document.querySelector('.ava_preview').getAttribute('src');
    this._userService.updateUser(this.user).then(response => {
      console.log(response);
      this.cancelUpload();
    });
  }

  cancelUpload() {
    this.avaPopup = false;
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

  uploadImage(event) {
    this.avaPopup = true;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      const preview = document.querySelector('.ava_preview');
      preview.setAttribute('src', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // reads the data as a URL
    }
  }

  ngOnInit() {
    this.comments = [];
    this.user = {
      email: this._localService.getLocalUser().email
    };
    this._userService.getCurrentUser().then(user => {
      this.user = user;
    }).then(() => {
      this._userService.getUserComments(this.user._id).then(response => {
        this.comments = response.comments || [];
        this.comments.forEach(c => {
          this.getCommentor(c.commentor);
        });
      });
    });
  }
}
