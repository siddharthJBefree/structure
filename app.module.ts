import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ErrorHandlingInterceptor} from './core/interceptors/error-handling.interceptor';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {LayoutModule} from './layout/layout.module';
import {LoaderComponent} from './layout/loader/loader.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    LoaderComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    MessageService,
    DialogService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
