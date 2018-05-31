import { Component, OnInit, Input } from '@angular/core';
import {WandersService} from '../../_services/wanders.service';
import {Router} from '@angular/router';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.html',
  styleUrls: ['./wander-results.css']
})
export class WanderResultsComponent implements OnInit {

  constructor(private _router: Router, private _userService: UserService) { }
  @Input() result: any;

  navigateToWander(id) {
    let thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const endRoute =  thisRoute.substring(n + 1, thisRoute.length);
    thisRoute = thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
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
