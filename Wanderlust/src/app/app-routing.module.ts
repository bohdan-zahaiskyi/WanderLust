import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page';
import { RegisterComponent} from './register/register.component';
import { VerificationComponent} from './register/verification/verification.component';
import { UserPageComponent} from './user-page/user-page';
import { AuthGuard} from './login/auth_guard';
import { UserProfileComponent } from './user-page/user-profile/user-profile.component';
import { UserMessagesComponent } from './user-page/user-messages/user-messages.component';
import { UserFriendsComponent } from './user-page/user-friends/user-friends.component';
import { UserWandersComponent } from './user-page/user-wanders/user-wanders.component';
import { UserPlacesComponent } from './user-page/user-places/user-places.component';
import { UserSettingsComponent } from './user-page/user-settings/user-settings.component';
import {AddEditWanderComponent} from './add-edit-wander/add-edit-wander.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'verify/:id', component: VerificationComponent},
  { path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: UserProfileComponent},
      { path: 'messages', component: UserMessagesComponent},
      { path: 'friends', component: UserFriendsComponent},
      { path: 'wanders', component: UserWandersComponent},
      { path: 'places', component: UserPlacesComponent},
      { path: 'settings', component: UserSettingsComponent},
      { path: 'create-wander', component: AddEditWanderComponent}
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
