import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorForbiddenComponent} from './error-forbidden/error-forbidden.component';
import {ErrorInternalServerComponent} from './error-internal-server/error-internal-server.component';
import {ErrorMethodNotAllowedComponent} from './error-method-not-allowed/error-method-not-allowed.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {ErrorRequestTimeoutComponent} from './error-request-timeout/error-request-timeout.component';
import {ErrorUnauthorizedComponent} from './error-unauthorized/error-unauthorized.component';

const routes: Routes = [
  {
    path: '401',
    component: ErrorUnauthorizedComponent
  },
  {
    path: '403',
    component: ErrorForbiddenComponent
  },
  {
    path: '404',
    component: ErrorNotFoundComponent
  },
  {
    path: '405',
    component: ErrorMethodNotAllowedComponent
  },
  {
    path: '408',
    component: ErrorRequestTimeoutComponent
  },
  {
    path: '500',
    component: ErrorInternalServerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ErrorRoutingModule {}
