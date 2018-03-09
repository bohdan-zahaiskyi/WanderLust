import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loggedAction = new EventEmitter<any>();
  email = '';
  password = '';

  constructor() { }

  login() {
    this.loggedAction.emit({email: this.email, password: this.password});
  }

}
