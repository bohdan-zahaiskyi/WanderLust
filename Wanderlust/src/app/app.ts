import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  loginPressed: boolean = false;
  showLogin(): void {
      this.loginPressed = !this.loginPressed;
  }
}
