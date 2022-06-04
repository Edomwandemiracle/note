import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
