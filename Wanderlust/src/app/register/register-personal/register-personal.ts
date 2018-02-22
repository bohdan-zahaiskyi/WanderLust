import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../user";
import { FormGroup, FormBuilder } from '@angular/forms';

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
        personCompany: [''],
        firstName: [''],
        lastName: [''],
        phoneCode: [''],
        phoneNum: ['']
      });
  }

  ngOnInit() {
  }
}
