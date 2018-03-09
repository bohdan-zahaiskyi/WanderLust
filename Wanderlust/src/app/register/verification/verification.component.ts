import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '../../_services/register.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  result = {
    success: false,
    message: ''
  };

  constructor(_route: ActivatedRoute, service: RegisterService, _router: Router) {
    _route.params.subscribe(value => {
      service.confirmUser(value).then(_result => {
        this.result = _result;
        if (_result.success === true) {
          console.log(value);
          _router.navigateByUrl('/user/' + value.id);
        }
      });
    });
  }

  ngOnInit() {
  }
}
