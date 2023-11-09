import {Injectable} from '@angular/core';
import {E_STORAGE, E_TEMP_STORAGE} from '../enums/storage.enum';
import {PublicService} from './public.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private ps: PublicService) {}

  set(key: E_STORAGE, value: any) {
    localStorage.setItem(key, this.ps.encrypt(value));
  }

  get(key: E_STORAGE) {
    const value = localStorage.getItem(key);
    if (!!value) {
      return this.ps.decrypt(value);
    } else {
      return undefined;
    }
  }

  remove(key: E_STORAGE) {
    localStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setTemp(key: E_TEMP_STORAGE, value: string) {
    sessionStorage.setItem(`TEMP_${key}`, this.ps.encrypt(value));
  }

  getTemp(key: E_TEMP_STORAGE) {
    const value = sessionStorage.getItem(`TEMP_${key}`);
    if (!!value) {
      return this.ps.decrypt(value);
    } else {
      return undefined;
    }
  }

  removeTemp(key: E_TEMP_STORAGE) {
    sessionStorage.removeItem(`TEMP_${key}`);
  }

  clearTemp() {
    sessionStorage.clear();
  }
}
