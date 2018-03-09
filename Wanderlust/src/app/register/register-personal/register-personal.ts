import {Component, OnInit, Input, Output, OnDestroy, EventEmitter} from '@angular/core';
import {User} from '../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.html',
  styleUrls: ['./register-personal.css']
})
export class RegisterPersonalComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() errorReporter = new EventEmitter<any>();
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group(
      {
        personCompany: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneCode: ['', Validators.required],
        phoneNum: ['', Validators.required]
      });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    const errorReport = {
      personCompany: this.form.controls.personCompany.errors,
      firstName: this.form.controls.firstName.errors,
      lastName: this.form.controls.lastName.errors,
      phoneCode: this.form.controls.phoneCode.errors,
      phoneNum: this.form.controls.phoneNum.errors
    };
    this.errorReporter.emit(errorReport);
  }
}
