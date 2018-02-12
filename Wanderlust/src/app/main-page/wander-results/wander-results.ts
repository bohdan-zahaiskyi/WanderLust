import { Component, OnInit } from '@angular/core';
import {Aim, PickUp, Wander} from '../../wander'
import {WandersService} from '../../wanders.service';

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.html',
  styleUrls: ['./wander-results.css']
})
export class WanderResultsComponent implements OnInit {

  constructor(private wanderService: WandersService) { }
  wanders: any[];

  ngOnInit() {
    this.wanderService.getWanders().then(wanders => this.wanders = wanders.wanders);
  }

}
