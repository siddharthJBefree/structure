import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, catchError, filter, mergeMap, of, retryWhen, throwError, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ApiConfig, CONFIG_TOKEN} from '../models/generic/api.model';
import {DesignService} from '../services/design.service';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  retryDelay = 1000;
  retryMaxAttempts = 1;

  constructor(
    private router: Router,
    private ds: DesignService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const config = request.context.get(CONFIG_TOKEN);
    if (config?.loading === true) this.ds.setLoader(true);
    return next.handle(request).pipe(
      // All function in this pipe will be executed when there is HTTP Response
      filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
      this.retryAfterDelay(config),
      this.showNotification(config),
      this.errorHandling(config),
      this.hideLoader(config)
    );
  }

  hideLoader(config: ApiConfig) {
    return map((res: any) => {
      if (config?.loading === true) this.ds.setLoader(false);
      return res;
    });
  }

  showNotification(config: ApiConfig) {
    return map((res: any) => {
      if (config?.hideSuccess === true) {
        return res;
      }

      if (res.status === 200 && res?.body?.STATUS?.NOTIFICATION) {
        this.ds.showNotification(res.body.STATUS.NOTIFICATION);
      }
      return res;
    });
  }

  errorHandling(config: ApiConfig): any {
    return catchError((error: HttpErrorResponse) => {
      if (config?.hideError === true) {
        return throwError(() => error);
      }

      try {
        switch (error.status) {
          case 0:
            this.ds.showError({error: {message: `${error.statusText} maybe Internet Issue`}});
            break;

          case 401:
          case 403:
          case 404:
          case 405:
          case 408:
            // this.navigateWithError(`/error/${error.status}`, error);
            this.ds.showError(error);
            break;

          case 422:
          case 423:
            this.ds.showError(error);
            break;

          case 500:
            this.ds.showError('Internal Server Error. Please contact Admin');
            break;
        }
      } catch (e) {}

      return throwError(() => error);
    });
  }

  retryAfterDelay(config: ApiConfig): any {
    return retryWhen<HttpEvent<unknown>>((errors) => {
      return errors.pipe(
        mergeMap((err, count) => {
          // throw error when we've retried ${retryMaxAttempts} number of times and still get an error
          if (this.skipRetry(err) || config?.skipRetry === true || count === this.retryMaxAttempts) {
            return throwError(() => err);
          }

          return of(err).pipe(mergeMap(() => timer(this.retryDelay)));
        }),
        take(this.retryMaxAttempts + 1)
      );
    });
  }

  private navigateWithError(url: string, error: HttpErrorResponse): void {
    this.router.navigate([url], {queryParams: {error: JSON.stringify(error)}});
  }

  private skipRetry(error: HttpErrorResponse): boolean {
    return [500, 408, 422, 423].includes(error.status);
  }
}
