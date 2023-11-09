import {HttpClient, HttpContext, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'projects/admin/src/environments/environment';
import {Observable} from 'rxjs';
import {ApiConfig, CONFIG_TOKEN} from '../models/generic/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string, params: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.get(`${environment.SERVER_URL}${path}`, {context, params});
  }

  getResponseText(path: string, params: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.get(`${environment.SERVER_URL}${path}`, {context, params, responseType: 'text'});
  }

  getArrayBuffer(path: string, params: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.get(`${environment.SERVER_URL}${path}`, {context, params, responseType: 'arraybuffer'});
  }

  getBlobBuffer(path: string, params: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.get(`${environment.SERVER_URL}${path}`, {context, params, responseType: 'blob'});
  }

  getJsonFile(path: string, params: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.get(`${path}`, {context, params});
  }

  post(path: string, body: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.post(`${environment.SERVER_URL}${path}`, body, {context});
  }

  postWithFileUpload(path: string, body: any, config?: ApiConfig): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.post(`${path}`, body, {context, headers: headers, reportProgress: true, observe: 'events'});
  }

  postResponseText(path: string, body: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.post(`${environment.SERVER_URL}${path}`, body, {context, responseType: 'text'});
  }

  postProgress(path: string, body: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.post(`${environment.SERVER_URL}${path}`, body, {
      context,
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(path: string, params: any = {}, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.delete(`${environment.SERVER_URL}${path}`, {context, params});
  }

  put(path: string, body: any = {}, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.put(`${environment.SERVER_URL}${path}`, body, {context});
  }

  putResponseText(path: string, body: any, config?: ApiConfig): Observable<any> {
    const context = new HttpContext().set(CONFIG_TOKEN, config);
    return this.http.put(`${environment.SERVER_URL}${path}`, body, {context, responseType: 'text'});
  }
}
