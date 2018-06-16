import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import {Router} from '@angular/router';
import {LocalService} from './_services/local.service';
import {UserService} from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  logged = false;
  loginPressed = false;

  constructor(private _userService: UserService, private _localService: LocalService, private authenticationService: AuthenticationService, private router: Router) {}

  get onHomePage() {
    return this._localService.getRouteEnding(this.router.url) === 'home';
  }

  showLogin(): void {
    if (!this.logged) {
      this.loginPressed = !this.loginPressed;
    } else {
      if (this.onHomePage) {
        this._userService.getUserByEmail(this._localService.getLocalUser().email).then(user => {
          this.router.navigateByUrl('/user/' + user._id + '/myProfile');
          this.loggedHeader();
        });
      } else {
        this.logout();
      }
    }
  }

  login(email, password) {
    this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result) {
          // login successful
          this.loginPressed = false;
          this.logged = true;
          this.router.navigateByUrl('user/' + result.id + '/myProfile');
          this.loggedHeader();
        } else {
          // login failed
          alert('Username or password is incorrect');
        }
      });
  }

  loggedHeader() {
    window.onscroll = function () {};
    const navbar = document.getElementById('myNavbar');
    navbar.className = navbar.className + ' w3-card w3-animate-top w3-white';
  }

  homeClicked() {
    const navbar = document.getElementById('myNavbar');
    navbar.className = navbar.className.replace(' w3-card w3-animate-top w3-white', '');
    this.enableScroll();
  }

  enableScroll() {
    window.onscroll = function () {
      const navbar = document.getElementById('myNavbar');
      if (document.body.scrollTop > window.innerHeight - 76 || document.documentElement.scrollTop > window.innerHeight - 76) {
        navbar.className = 'w3-bar' + ' w3-card' + ' w3-animate-top' + ' w3-white';
      } else {
        navbar.className = navbar.className.replace(' w3-card w3-animate-top w3-white', '');
      }
    };
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
    this.enableScroll();
    if (localStorage.currentUser) {
      this.logged = true;
    }
  }
}
