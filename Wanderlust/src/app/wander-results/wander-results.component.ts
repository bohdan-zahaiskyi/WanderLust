import { Component, OnInit } from '@angular/core';
import {Aim, PickUp, Wander} from '../wander'

@Component({
  selector: 'app-wander-results',
  templateUrl: './wander-results.component.html',
  styleUrls: ['./wander-results.component.css']
})
export class WanderResultsComponent implements OnInit {

  w1: Wander = {
    aim : Aim.Cities,
    budget : 200,
    destinations : ["Rome", "Paris"],
    people : 4,
    id : 1,
    description : "",
    pickUp : PickUp.Hitchhike,
    startDate : "26.05.2018",
    endDate : "30.05.2018"
  };
    w2: Wander = {
    aim : Aim.NatureLandscapes,
    budget : 20,
    destinations : ["Lviv", "Hoverla"],
    people : 4,
    id : 2,
    description : "",
    pickUp : PickUp.TrainBus,
    startDate : "11.03.2018",
    endDate : "14.03.2018"
  };
  wanders: Wander[] = [this.w1, this.w2];
  

  constructor() { }

  ngOnInit() {
  }

}
