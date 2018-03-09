import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {User} from "../../_models/user";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.html',
  styleUrls: ['./register-location.css']
})
export class RegisterLocationComponent implements OnInit {
  @Input() user: User;
  @Output() errorReporter = new EventEmitter<any>();
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  sendReport() {
    const errorReport = {
      country: this.form.controls.country.errors,
      state: this.form.controls.state.errors,
      city: this.form.controls.city.errors
    };
    this.errorReporter.emit(errorReport);
  }
  ngOnInit() {
  }
}
