import { Component, OnInit } from '@angular/core';
import {WandersService} from '../_services/wanders.service';
import {Router} from '@angular/router';
import {LocalService} from '../_services/local.service';

@Component({
  selector: 'app-add-edit-wander',
  templateUrl: './add-edit-wander.component.html',
  styleUrls: ['./add-edit-wander.component.css']
})
export class AddEditWanderComponent implements OnInit {

  constructor(private _localService: LocalService, private _router: Router, private _wanderService: WandersService) { }
  wander: any;
  imgPath: any;
  imageLoaded: boolean;

  addDestination() {
    this.wander.destinations.push({dest: ''});
  }
  removeDestination(destination) {
    const index = this.wander.destinations.indexOf(destination);
    this.wander.destinations.splice(index, 1);
  }
  uploadWanderImg(event) {
    this.imageLoaded = true;
    console.log(event);
    const preview = document.querySelector('.wander_image');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      preview.setAttribute('src', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // reads the data as a URL
    } else {
      preview.setAttribute('src', '');
    }
  }
  saveWander() {
    const img = document.querySelector('.wander_image');
    this.wander.imgURL = this.getImageURL(img);
    this._wanderService.saveWander(this.wander).then(response => {
      console.log(response);
      this.cancelSave();
    });
  }
  cancelSave() {
    this._router.navigateByUrl(this._localService.getCurrentRoute(this._router.url) + '/wanders');
  }

  getImageURL(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Copy the image contents to the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // const dataURL = canvas.toDataURL('image/png');
    return canvas.toDataURL('image/png'); // dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    // return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  ngOnInit() {
    this.wander = {
      destinations: [{dest: 'Vasa'}, {dest: ''}],
      initiator: this._localService.getLocalUser().email,
      startDate: '',
      endDate: '',
      budget: 0,
      people: 0
    };
    this.imageLoaded = false;
  }
}
