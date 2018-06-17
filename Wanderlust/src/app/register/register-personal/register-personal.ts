import {Component, OnInit, Input, Output, OnDestroy, EventEmitter} from '@angular/core';
import {User} from '../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LocalService} from '../../_services/local.service';

@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.html',
  styleUrls: ['./register-personal.css']
})
export class RegisterPersonalComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() errorReporter = new EventEmitter<any>();
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private _localService: LocalService) {
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

  get date() {
    return new Date(this.user.birthdate);
  }
  set date(value) {
    this.user.birthdate = this._localService.dateToString(value);
  }

  ngOnDestroy() {
    const errorReport = {
      personCompany: this.form.controls.personCompany.errors,
      firstName: this.form.controls.firstName.errors,
      lastName: this.user.personCompany === 'Company' ? null : this.form.controls.lastName.errors,
      phoneCode: this.form.controls.phoneCode.errors,
      phoneNum: this.form.controls.phoneNum.errors
    };
    this.errorReporter.emit(errorReport);
  }
}
