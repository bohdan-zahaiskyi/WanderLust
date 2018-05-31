import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { WandersService } from '../../_services/wanders.service';

@Component({
  selector: 'app-user-wanders',
  templateUrl: './user-wanders.component.html',
  styleUrls: ['./user-wanders.component.css']
})
export class UserWandersComponent implements OnInit {

  constructor(private _router: Router, private _wanderService: WandersService) { }
  myEmail: string;
  myWanders: any;

  show(){
    console.log(this.myWanders);
  }
  createWander() {
    let thisRoute = this._router.url;
    const n = thisRoute.lastIndexOf('/');
    thisRoute = thisRoute.substring(0, n !== -1 ? n : thisRoute.length);
    this._router.navigateByUrl(thisRoute + '/createWander');
  }
  ngOnInit() {
    this.myEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    this._wanderService.getMyWanders(this.myEmail).then(data => {
      this.myWanders = {searchResults: data.filteredWanders || null};
    });
  }
}
