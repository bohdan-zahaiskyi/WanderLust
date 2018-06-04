import { Component, OnInit, Input } from '@angular/core';
import {WandersService} from '../../_services/wanders.service';
import {Router} from '@angular/router';
import {UserService} from '../../_services/user.service';
import {LocalService} from '../../_services/local.service';

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.html',
  styleUrls: ['./wander-results.css']
})
export class WanderResultsComponent implements OnInit {

  constructor(private _localService: LocalService, private _router: Router, private _userService: UserService) { }
  @Input() result: any;

  navigateToWander(id) {
    const thisRoute = this._localService.getCurrentRoute(this._router.url);
    const endRoute =  this._localService.getRouteEnding(this._router.url);
    console.log(endRoute);
    if (endRoute === 'home') {
      this._userService.getCurrentUser().then(user => {
        this._router.navigateByUrl(thisRoute + 'user/' + user._id + '/wander/' + id);
      });
    }
    else {
      this._router.navigateByUrl(thisRoute + '/wander/' + id);
    }
  }
  ngOnInit() {
    this.result = {
      searchResult: {}
    };
  }
}
