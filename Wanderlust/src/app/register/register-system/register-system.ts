import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../registration';
import { SystemValidation } from '../RegistrationValidation';

declare var window: any;
declare var FB: any;


@Component({
  selector: 'app-register-system',
  templateUrl: './register-system.html',
  styleUrls: ['./register-system.css']
})
export class RegisterSystemComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() onVoted = new EventEmitter<any>();
  facebookUser: any;
  confpass: string;
  public barLabel = 'Password strength:';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.required]
      },
      {
        validator: [SystemValidation.MatchPassword, SystemValidation.CheckPassword, SystemValidation.checkEmail]
      });

    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {

      FB.init({
        appId            : 1778618309108589,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
      });
      FB.AppEvents.logPageView();
      // This is where we do most of our code dealing with the FB variable like adding an observer to check when the user signs in

      // ** ADD CODE TO NEXT STEP HERE **
      FB.Event.subscribe('auth.statusChange', (response => {

        if (response.status === 'connected') {
          this.facebookUser = response;
          // use the response variable to get any information about the user and to see the tokens about the users session
        }
      }));
    };
  }
  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }
  ngOnDestroy() {
    const errorReport = {
      email: this.form.controls.email.errors,
      password: this.form.controls.password.errors
    };
    this.onVoted.emit(errorReport);
/*    if (this.user.confpass !== this.user.password) {
      alert("Password doesn't match!");
      return;
    }*/
  }
}
