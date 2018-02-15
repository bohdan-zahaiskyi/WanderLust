import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page';
import { RegisterComponent} from './register/register.component';
import { RegisterSystemComponent} from './register/register-system/register-system';
import { RegisterPersonalComponent} from './register/register-personal/register-personal';
import { RegisterLocationComponent} from './register/register-location/register-location';
import {Register} from "ts-node";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'register', component: RegisterComponent, children: [
      {path: 'system', component: RegisterSystemComponent},
      {path: 'personal', component: RegisterPersonalComponent},
      {path: 'location', component: RegisterLocationComponent}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
