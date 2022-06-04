import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth-guard/auth.guard';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'create-note', component: CreateComponent},
      {path: 'create-note/:id', component: CreateComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
