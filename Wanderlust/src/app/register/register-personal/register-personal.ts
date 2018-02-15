import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.html',
  styleUrls: ['./register-personal.css']
})
export class RegisterPersonalComponent implements OnInit {
  currentvalue;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((values: {id: number}) => {
      this.currentvalue = values.id;
    })
  }
}
