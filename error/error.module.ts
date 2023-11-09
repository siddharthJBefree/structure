import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ErrorForbiddenComponent} from './error-forbidden/error-forbidden.component';
import {ErrorInternalServerComponent} from './error-internal-server/error-internal-server.component';
import {ErrorMethodNotAllowedComponent} from './error-method-not-allowed/error-method-not-allowed.component';
import {ErrorNotFoundComponent} from './error-not-found/error-not-found.component';
import {ErrorRequestTimeoutComponent} from './error-request-timeout/error-request-timeout.component';
import {ErrorRoutingModule} from './error-routing.module';
import {ErrorUnauthorizedComponent} from './error-unauthorized/error-unauthorized.component';

@NgModule({
  declarations: [
    ErrorForbiddenComponent,
    ErrorInternalServerComponent,
    ErrorMethodNotAllowedComponent,
    ErrorNotFoundComponent,
    ErrorRequestTimeoutComponent,
    ErrorUnauthorizedComponent
  ],
  imports: [SharedModule, ErrorRoutingModule]
})
export class ErrorModule {}
