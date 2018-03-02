import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../registration';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-personal',
  templateUrl: './register-personal.html',
  styleUrls: ['./register-personal.css']
})
export class RegisterPersonalComponent implements OnInit {
  @Input() user: User;
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
    console.log(this.form.controls.firstName.errors);
  }
  ngOnInit() {
  }
}
