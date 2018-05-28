// ===================== MODULES ======================
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

// ===================== SERVICES =====================
import { WandersService } from './_services/wanders.service';
import { RegisterService} from './_services/register.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService} from './_services/user.service';

// ==================== COMPONENTS ====================
import { AppComponent } from './app';
import { WanderSearchComponent } from './main-page/wander-search/wander-search';
import { WanderResultsComponent } from './main-page/wander-results/wander-results';
import { MainPageComponent } from './main-page/main-page';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSystemComponent } from './register/register-system/register-system';
import { RegisterPersonalComponent } from './register/register-personal/register-personal';
import { RegisterLocationComponent } from './register/register-location/register-location';
import { VerificationComponent } from './register/verification/verification.component';
import { UserPageComponent } from './user-page/user-page';
import { UserProfileComponent } from './user-page/user-profile/user-profile.component';
import { UserMessagesComponent } from './user-page/user-messages/user-messages.component';
import { UserFriendsComponent } from './user-page/user-friends/user-friends.component';
import { UserWandersComponent } from './user-page/user-wanders/user-wanders.component';
import { UserPlacesComponent } from './user-page/user-places/user-places.component';
import { UserSettingsComponent } from './user-page/user-settings/user-settings.component';

// ================== OTHER CLASSES ===================
import {AuthGuard} from './login/auth_guard';
import { AddEditWanderComponent } from './add-edit-wander/add-edit-wander.component';

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
    RegisterLocationComponent,
    VerificationComponent,
    UserPageComponent,
    UserProfileComponent,
    UserMessagesComponent,
    UserFriendsComponent,
    UserWandersComponent,
    UserPlacesComponent,
    UserSettingsComponent,
    AddEditWanderComponent
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
    RegisterService,
    AuthenticationService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
