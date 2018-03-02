import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

/*===================== SERVICES =====================*/
import { WandersService } from './wanders.service';
import { RegisterService} from './register.service';

import { AppComponent } from './app';
import { WanderSearchComponent } from './main-page/wander-search/wander-search';
import { WanderResultsComponent } from './main-page/wander-results/wander-results';
import { MainPageComponent } from './main-page/main-page';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterSystemComponent } from './register/register-system/register-system';
import { RegisterPersonalComponent } from './register/register-personal/register-personal';
import { RegisterLocationComponent } from './register/register-location/register-location';

import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WanderSearchComponent,
    WanderResultsComponent,
    LoginComponent,
    RegisterComponent,
    RegisterSystemComponent,
    RegisterPersonalComponent,
    RegisterLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    PasswordStrengthBarModule,
    HttpClientModule
  ],
  providers: [
    HttpClientModule,
    WandersService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
