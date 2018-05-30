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

  ngOnInit() {
    this.wander = {
      destinations: ['', '']
    };
    const thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    const thisId = thisRoute.substring(n + 1, thisRoute.length);
    console.log(thisId);
    this._wanderService.getWanderById(thisId).then(data => {
      this.wander = data.wander[0];
    });
  }

}
