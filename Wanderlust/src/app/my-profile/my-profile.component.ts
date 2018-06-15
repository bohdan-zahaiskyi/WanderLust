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
    this.user = {
      email: this._localService.getLocalUser().email;
    };
    this._userService.getCurrentUser().then(user => {
      this.user = user;
    });
  }
}
