import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { WandersService } from '../../_services/wanders.service';
import {LocalService} from '../../_services/local.service';

@Component({
  selector: 'app-user-wanders',
  templateUrl: './user-wanders.component.html',
  styleUrls: ['./user-wanders.component.css']
})
export class UserWandersComponent implements OnInit {

  constructor(private _localService: LocalService, private _router: Router, private _wanderService: WandersService) { }
  myEmail: string;
  myWanders: any;
  myInvited: any;

  show() {
    console.log(this.myWanders);
  }
  createWander() {
    this._router.navigateByUrl(this._localService.getCurrentRoute(this._router.url) + '/createWander');
  }
  ngOnInit() {
    this.myWanders = [];
    this.myInvited = [];
    this.myEmail = this._localService.getLocalUser().email;
    this._wanderService.getInvited(this.myEmail)
      .then(invited => {
        const mapped = [];
        invited.forEach(wander => {
          mapped.push({priority: 1, wander});
        });
        this.myInvited = {searchResults: mapped};
      });
    this._wanderService.getMyWanders(this.myEmail).then(data => {
      this.myWanders = {searchResults: data.filteredWanders || null};
    });
  }
}
