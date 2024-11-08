import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./../modules/auth/auth.module').then((m) => m.AuthModule), //lazy load the module
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Default route for redirection
  { path: '**', redirectTo: '/auth/login' }, // Wildcard route for 404 handling
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
