import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {LocalService} from '../_services/local.service';
import {Wander} from '../_models/wander';
import {WandersService} from '../_services/wanders.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: '../user-page/user-profile/user-profile.component.html',
  styleUrls: ['../user-page/user-profile/user-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(private _wanderService: WandersService, private _userService: UserService, private _localService: LocalService) { }
  user: any;
  isMe = true;
  avaPopup: any = false;
  comments: any;
  showTab = 'comments';
  userWanders: any;

  get userAvatar() {
    if (this.user.avatar && this.user.avatar !== '') {
      return this.user.avatar;
    }
    return '../../assets/images/users/bzahay.png';
  }

  uploadAva() {
    if (this.avaPopup === 'avatar') {
      this.user.avatar = document.querySelector('.ava_preview').getAttribute('src');
      this._userService.updateUser(this.user).then(response => {
        console.log(response);
        this.cancelUpload();
      });
    } else if (this.avaPopup === 'image') {
      this.user.images = this.user.images || [];
      this.user.images.push({src: document.querySelector('.ava_preview').getAttribute('src')});
      this._userService.updateUser(this.user).then(response => {
        console.log(response);
        this.cancelUpload();
      });
    }
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

  uploadImage(event, type) {
    this.avaPopup = type;
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
    this.userWanders = [];
    this._wanderService.getMyWanders(this.user.email).then(data => {
      this.userWanders = {searchResults: data.filteredWanders || null};
    });
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
