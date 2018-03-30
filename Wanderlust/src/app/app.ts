import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  logged = false;
  loginPressed = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  showLogin(): void {
    if (!this.logged) {
      this.loginPressed = !this.loginPressed;
    } else {
      this.logout();
    }
  }

  login(email, password) {
    this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result) {
          // login successful
          this.loginPressed = false;
          this.logged = true;
          this.router.navigate(['user/' + result.id + '/profile']);
        } else {
          // login failed
          alert('Username or password is incorrect');
        }
      });
  }

  logout() {
    localStorage.clear();
    this.logged = false;
    this.router.navigateByUrl('/home');
  }
  loginAction(data: any) {
    this.login(data.email, data.password);
  }

  ngOnInit() {
    if (localStorage.currentUser) {
      this.logged = true;
    }
  }
}
