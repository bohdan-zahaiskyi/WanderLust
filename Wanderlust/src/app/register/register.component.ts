import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {RegisterService} from '../register.service';
import { Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  currentRoute = 0;
  dataSubscription: Subscription;
  user = new User();
  conf_pass = '';

  confirmRegistration(): void {
    console.log(this.user);
  }

  nextStep(): void {
    this.currentRoute++;
  }
  setStep(step: number): void {
    this.currentRoute = step;
  }
  prevStep(): void {
    this.currentRoute--;
  }

  constructor(registerService: RegisterService) {

    this.dataSubscription = registerService.getData().subscribe(data => {
      Object.assign(this.user, data);
    });
  }
  ngOnInit() {

  }
}
