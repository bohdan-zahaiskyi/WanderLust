import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {RegisterService} from '../_services/register.service';
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
  service: RegisterService;
  router: Router;
  confirmPressed = false;
  fillingError = '';
  errorReport = {
    city: {required: true},
    country: {required: true},
    email: {required: true},
    firstName: {required: true},
    lastName: {required: true},
    password: {required: true},
    confpass: {required: true},
    personCompany: {required: true},
    phoneCode: {required: true},
    phoneNum: {required: true},
    state: {required: true}
  };

  checkFields() {
    const keys = Object.keys(this.errorReport);
    for (let i = 0; i < keys.length; i++) {
      if (this.errorReport[keys[i]] != null) {
        return false;
      }
    }
    return true;
  }

  confirmRegistration(): void {
    if (this.checkFields()) {
      this.service.addUser(this.user).then(response => {
      if (response && response.success) {
        this.router.navigateByUrl('/home');
        console.log('success');
      }
      }).catch(error => {
        console.log(error);
      });
    }
    else {
      const keys = Object.keys(this.errorReport);
      for (let i = 0; i < keys.length; i++) {
        if (this.errorReport[keys[i]] != null) {
          this.fillingError = keys[i] + ' field is invalid';
          break;
        }
      }
      this.confirmPressed = true;
    }
  }

  nextStep(): void {
    this.currentRoute++;
    this.confirmPressed && (this.confirmPressed = false);
  }
  setStep(step: number): void {
    this.currentRoute = step;
    this.confirmPressed && (this.confirmPressed = false);
  }
  prevStep(): void {
    this.currentRoute--;
    this.confirmPressed && (this.confirmPressed = false);
  }
  errorReporter(report: any) {
    Object.assign(this.errorReport, report);
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
