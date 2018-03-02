import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {RegisterService} from '../register.service';
import { Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

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
  service: RegisterService;
  router: Router;

  confirmRegistration(): void {
    this.service.addUser(this.user).then(response => {
      if (response && response.success) {
        this.router.navigateByUrl('/home');
      }
    }).catch(error => {
      console.log(error);
    });
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

  constructor(registerService: RegisterService, _router: Router) {
    this.router = _router;
    this.service = registerService;
    this.dataSubscription = registerService.getData().subscribe(data => {
      Object.assign(this.user, data);
    });
  }
  ngOnInit() {

  }
}
