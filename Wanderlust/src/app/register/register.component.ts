import { Component, OnInit } from '@angular/core';
import {Registration} from '../registration';
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
  registration = new Registration();
  service: RegisterService;
  router: Router;
  errorReport = {};

  confirmRegistration(): void {
    console.log(this.errorReport);
    /*this.service.addUser(this.user).then(response => {
      if (response && response.success) {
        this.router.navigateByUrl('/home');
      }
    }).catch(error => {
      console.log(error);
    });*/
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
  onVoted(report: any) {
    Object.assign(this.errorReport, report);
  }
  constructor(registerService: RegisterService, _router: Router) {
    this.router = _router;
    this.service = registerService;
    this.dataSubscription = registerService.getData().subscribe(data => {
      Object.assign(this.registration.user, data);
    });
  }
  ngOnInit() {

  }
}
