import {HttpEvent, HttpHandler, HttpInterceptor, HttpParameterCodec, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addHeaders(request));
  }

  addHeaders(request: HttpRequest<unknown>): any {
    const params = new HttpParams({
      encoder: new CustomHttpParamEncoder(),
      fromString: request.params.toString()
    });

    const token = this.authService.getToken();

    return request.clone({
      params,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    key = key.trim();
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    value = value.trim();
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    key = key.trim();
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    value = value.trim();
    return decodeURIComponent(value);
  }
}
