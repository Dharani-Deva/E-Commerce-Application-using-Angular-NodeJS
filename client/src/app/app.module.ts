//app.module.ts- TypeScript file which acts as a entry point to e learning client application ///
//               It contains app-routing module and several components                         //
/////////////////////////////////////////////////////////////////////////////////////////////////

//Including required modules and Services 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';


//Module decorator specifying all the components used in the application 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent],
})
//Exporting the AppModule
export class AppModule {}
