import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(_authentification: AuthenticationService, http: HttpClient) { }

}
