import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../registration";

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.html',
  styleUrls: ['./register-location.css']
})
export class RegisterLocationComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit() {
  }

}
