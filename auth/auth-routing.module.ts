import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_ROUTES} from '../core/constants/routes.const';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component').then((c) => c.ResetPasswordComponent)
  },
  {
    path: 'terms-and-condition',
    loadComponent: () => import('./terms-and-condition/terms-and-condition.component').then((c) => c.TermsAndConditionComponent)
  },
  {path: '**', redirectTo: APP_ROUTES.error404}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
