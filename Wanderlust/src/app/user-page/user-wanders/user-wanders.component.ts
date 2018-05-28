import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-wanders',
  templateUrl: './user-wanders.component.html',
  styleUrls: ['./user-wanders.component.css']
})
export class UserWandersComponent implements OnInit {

  constructor(private _router: Router) { }

  createWander() {
    this._router.navigateByUrl('user/:id/create-wander');
  }
  ngOnInit() {
  }

}
