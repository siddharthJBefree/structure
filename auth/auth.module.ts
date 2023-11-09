import {NgModule} from '@angular/core';

import {LoaderComponent} from '../layout/loader/loader.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [AuthRoutingModule, SharedModule, LoaderComponent]
})
export class AuthModule {}
