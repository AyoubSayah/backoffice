import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './apis/admin.guard';
import { LoginGuard } from './apis/login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],

    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: '**', redirectTo: 'admin/users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
