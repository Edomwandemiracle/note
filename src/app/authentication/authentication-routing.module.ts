import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthHomeComponent } from "./auth-home.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    component: AuthHomeComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
