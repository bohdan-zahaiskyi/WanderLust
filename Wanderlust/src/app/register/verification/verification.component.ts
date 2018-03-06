import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {RegisterService} from '../../register.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(_route: ActivatedRoute, service: RegisterService) {
    _route.params.subscribe(value => {
      service.confirmUser(value);
    });
  }

  ngOnInit() {
  }
}
