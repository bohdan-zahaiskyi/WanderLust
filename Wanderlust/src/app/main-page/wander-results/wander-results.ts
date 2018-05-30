import { Component, OnInit, Input } from '@angular/core';
import {WandersService} from '../../_services/wanders.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.html',
  styleUrls: ['./wander-results.css']
})
export class WanderResultsComponent implements OnInit {

  constructor(private _router: Router, private wanderService: WandersService) { }
  @Input() result: any;

  navigateToWander(id) {
    let thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    thisRoute = thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
    this._router.navigateByUrl(thisRoute + '/wander/' + id);
  }
  ngOnInit() {
    this.result = {
      searchResult: {}
    };
  }
}
