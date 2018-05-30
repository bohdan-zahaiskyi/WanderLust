import {Component, OnInit} from '@angular/core';
import {WandersService} from '../_services/wanders.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPageComponent implements OnInit {
    constructor(private _wanderService: WandersService) {}
    wanderSearchResults: any = {};

    wanderSearchReporter(report: any) {
      Object.assign(this.wanderSearchResults, report);
    }
    show() {
      console.log(this.wanderSearchResults);
    }
    ngOnInit() {

    }
}
