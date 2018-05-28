import { Component, OnInit } from '@angular/core';
import {WandersService} from '../../_services/wanders.service';

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.html',
  styleUrls: ['./wander-results.css']
})
export class WanderResultsComponent implements OnInit {

  constructor(private wanderService: WandersService) { }
  wanders: any[];

  ngOnInit() {
    this.wanderService.getWanders().then(data => this.wanders = data.wanders);
  }
}
