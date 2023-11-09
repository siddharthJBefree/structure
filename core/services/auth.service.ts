import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {API_ROUTES} from '../constants/api-routes.const';
import {E_STORAGE} from '../enums/storage.enum';
import {AdminUser} from '../models/admin-user.model';
import {PrivilegeList} from '../models/generic/privilege.model';
import {ICurrentScreen} from '../models/screen.model';
import {ApiService} from './api.service';
import {DesignService} from './design.service';
import {PublicService} from './public.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static isAlreadyInitialized = false;
  private _token!: string;
  private userRightsSubject = new BehaviorSubject<PrivilegeList>([]);
  public userRights = this.userRightsSubject.asObservable();

  private userDataSubject = new BehaviorSubject<AdminUser>(new AdminUser());
  public userData = this.userDataSubject.asObservable();

  private _currentScreen = {};
  public getCurrentScreen() {
    return this._currentScreen as ICurrentScreen;
  }
  private setCurrentScreen(value: ICurrentScreen) {
    document.title = `Befree - ${value.name}`;
    this._currentScreen = value;
  }

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private ds: DesignService,
    private ps: PublicService
  ) {
    if (AuthService.isAlreadyInitialized === true) {
      alert("Don't Reinitialize(Provide) Auth Service");
    } else {
      AuthService.isAlreadyInitialized = true;
    }

    this.refillStorageData();
  }

  refillStorageData() {
    const userData = this.ps.jsonParse(this.storage.get(E_STORAGE.USER) || '') as AdminUser;
    this.userDataSubject.next(userData);

    const userRights = this.ps.jsonParse(this.storage.get(E_STORAGE.ADMIN_PRIVILEGE) || '') as PrivilegeList;
    this.userRightsSubject.next(userRights);
  }

  checkIp() {
    return this.api.get(API_ROUTES.checkIpAddress, {});
  }

  login(loginData: any) {
    this.api.post(API_ROUTES.login, loginData).subscribe({
      next: (success) => {
        console.log('TCL: AuthService -> login -> success', success);
        this.storage.remove(E_STORAGE.TOKEN);
        this.setToken(success.token);

        this.getMyData();
      }
    });
  }

  getMyData() {
    this.api.post(API_ROUTES.me, {}).subscribe({
      next: (success) => {
        console.log(success);
        this.setUser(success.user);

        if (!!success.user && success.user.food_next_date !== '') {
          //this.onCheckFoodStatus();
        } else {
          this.ds.router.navigate([this.ps.appRoutes.adminDashboard]);
        }
      }
    });
  }

  logout() {
    this.api.post(API_ROUTES.logout, {}).subscribe({
      next: () => {
        this.storage.clear();
        this.ds.router.navigate([this.ps.appRoutes.login]);
      }
    });
  }

  getMenuList() {
    console.log('Get Menu List Functionality Implement');
  }

  checkRights() {
    console.log('Check Rights Functionality Implement');
  }

  setUser(obj: AdminUser) {
    console.log('Set User Data Functionality Implement');

    this.storage.set(E_STORAGE.USER, JSON.stringify(obj));
    this.userDataSubject.next(obj);
  }

  getUser(): AdminUser {
    console.log('Get User Data Functionality Implement');
    return this.userDataSubject.getValue();
  }

  setToken(value: string): void {
    this.storage.set(E_STORAGE.TOKEN, value);
    this._token = value;
  }

  getToken(): string {
    this._token = this.storage.get(E_STORAGE.TOKEN) || '';
    return this._token;
  }

  setPrivilege(privilegeList: PrivilegeList) {
    this.storage.set(E_STORAGE.ADMIN_PRIVILEGE, JSON.stringify(privilegeList));
    this.userRightsSubject.next(privilegeList);
  }

  getPrivilege(): PrivilegeList {
    return this.userRightsSubject.getValue();
  }
}
