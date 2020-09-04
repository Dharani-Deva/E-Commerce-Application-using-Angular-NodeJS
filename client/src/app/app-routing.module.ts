//app-routing.module.ts- Module which handles various routes in  learning client application ///

//including required services and modules 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { AuthGuardService } from './auth-guard.service';


//assigning all possible routes to variable 
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

//decorator to import and export routing Module in the application 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
