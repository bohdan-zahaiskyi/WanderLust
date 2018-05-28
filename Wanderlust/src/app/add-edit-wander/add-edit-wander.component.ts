import { Component, OnInit } from '@angular/core';
import {WandersService} from '../_services/wanders.service';

@Component({
  selector: 'app-add-edit-wander',
  templateUrl: './add-edit-wander.component.html',
  styleUrls: ['./add-edit-wander.component.css']
})
export class AddEditWanderComponent implements OnInit {

  constructor(private _wanderService: WandersService) { }
  wander: any;

  addDestination() {
    this.wander.destinations.push('');
  }
  removeDestination(destination) {
    const index = this.wander.destinations.indexOf(destination);
    this.wander.destinations.splice(index, 1);
  }
  saveWander() {
    console.log(this.wander);
    this._wanderService.saveWander(this.wander).then(response => {
      console.log(response);
    });
  }
  ngOnInit() {
    this.wander = {
      destinations: ['Vasa', ''],
      startDate: '',
      endDate: '',
      budget: 0,
      people: 0
    };
  }
}
