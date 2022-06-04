import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthHomeComponent } from './auth-home.component';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    LoginComponent,
    AuthHomeComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [

  ],
})
export class AuthenticationModule {}
