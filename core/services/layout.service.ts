import {Injectable} from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {BehaviorSubject, Subject} from 'rxjs';
import {E_STORAGE} from '../enums/storage.enum';
import {AppConfig, ColorScheme, LayoutState, MenuChangeEvent, MenuMode, TabCloseEvent} from '../models/generic/layout.model';
import {PublicService} from './public.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  static isAlreadyInitialized = false;
  readonly componentThemes = [
    {name: 'indigo', lightColor: '#4C63B6', darkColor: '#6A7EC2'},
    {name: 'blue', lightColor: '#1992D4', darkColor: '#3BABE8'},
    {name: 'green', lightColor: '#27AB83', darkColor: '#44D4A9'},
    {name: 'deep-purple', lightColor: '#896FF4', darkColor: '#B1A0F8'},
    {name: 'orange', lightColor: '#DE911D', darkColor: '#E8AB4F'},
    {name: 'cyan', lightColor: '#00B9C6', darkColor: '#58CDD5'},
    {name: 'yellow', lightColor: '#F9C404', darkColor: '#FDDD68'},
    {name: 'pink', lightColor: '#C74B95', darkColor: '#D77FB4'},
    {name: 'purple', lightColor: '#BA6FF4', darkColor: '#D1A0F8'},
    {name: 'lime', lightColor: '#84BD20', darkColor: '#A3D44E'}
  ];

  private _config: AppConfig = {
    ripple: true,
    inputStyle: 'outlined',
    menuMode: 'slim-plus',
    colorScheme: 'dark',
    theme: 'indigo',
    layoutTheme: 'colorScheme',
    scale: 14
  };
  private config = new BehaviorSubject<AppConfig>(this._config);
  config$ = this.config.asObservable();

  private _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  };
  private state = new BehaviorSubject<LayoutState>(this._state);
  state$ = this.state.asObservable();

  tabs: MenuItem[] = [];

  private overlayOpen = new Subject<any>();
  overlayOpen$ = this.overlayOpen.asObservable();

  private tabOpen = new Subject<MenuItem>();
  tabOpen$ = this.tabOpen.asObservable();

  private tabClose = new Subject<TabCloseEvent>();
  tabClose$ = this.tabClose.asObservable();

  private menuSource = new Subject<MenuChangeEvent>();
  menuSource$ = this.menuSource.asObservable();

  private resetSource = new Subject();
  resetSource$ = this.resetSource.asObservable();

  constructor(
    private primeNgConfig: PrimeNGConfig,
    private storage: StorageService,
    private ps: PublicService
  ) {
    if (LayoutService.isAlreadyInitialized === true) {
      alert("Don't Reinitialize(Provide) Layout Service");
    } else {
      LayoutService.isAlreadyInitialized = true;
    }

    const configString = this.storage.get(E_STORAGE.THEME);
    const config = this.ps.jsonParse(configString);
    if (!!configString) {
      this.setConfigurations(config);
    } else {
      this.setConfigurations(this._config);
    }
  }

  setConfigurations(config: AppConfig) {
    this._config = config;
    this.applyScale();
    this.setRipple(this._config.ripple);
    this.setMenuMode(this._config.menuMode);
    this.setThemeLink();
  }

  onMenuToggle() {
    if (this.isOverlay()) {
      this._state.overlayMenuActive = !this._state.overlayMenuActive;

      if (this._state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }
    if (this.isDesktop()) {
      this._state.staticMenuDesktopInactive = !this._state.staticMenuDesktopInactive;
    } else {
      this._state.staticMenuMobileActive = !this._state.staticMenuMobileActive;

      if (this._state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }

    this.onConfigUpdate();
  }

  onOverlaySubmenuOpen() {
    this.overlayOpen.next(null);
  }

  showProfileSidebar() {
    this._state.profileSidebarVisible = true;
  }

  showConfigSidebar() {
    this._state.configSidebarVisible = true;
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isOverlay() {
    return this._config.menuMode === 'overlay';
  }

  isSlim() {
    return this._config.menuMode === 'slim';
  }

  isSlimPlus() {
    return this._config.menuMode === 'slim-plus';
  }

  isMobile() {
    return !this.isDesktop();
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  onTabOpen(value: MenuItem) {
    this.tabOpen.next(value);
  }

  openTab(value: MenuItem) {
    this.tabs = [...this.tabs, value];
  }

  onTabClose(value: MenuItem, index: number) {
    this.tabClose.next({tab: value, index: index});
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    this.tabs = [...this.tabs];
  }

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  resetMenu() {
    this.resetSource.next(true);
  }

  decrementScale() {
    this._config.scale--;
    this.applyScale();
  }

  incrementScale() {
    this._config.scale++;
    this.applyScale();
    this.onConfigUpdate();
  }

  setRipple(val: boolean) {
    this._config.ripple = val;
    this.primeNgConfig.ripple = val;

    this.onConfigUpdate();
  }

  setInputStyle(val: string) {
    this._config.inputStyle = val;

    this.onConfigUpdate();
  }

  setColorScheme(colorScheme: ColorScheme) {
    if (colorScheme == 'dark') {
      this._config.layoutTheme = 'colorScheme';
    }

    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');

    const currentColorScheme = 'theme-' + this._config.colorScheme;
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);
    this.replaceThemeLink(newHref, () => {
      this._config.colorScheme = colorScheme;
      this.onConfigUpdate();
    });
  }

  setTheme(theme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const newHref = themeLink.getAttribute('href')!.replace(this._config.theme, theme);
    this.replaceThemeLink(newHref, () => {
      this._config.theme = theme;
      this.onConfigUpdate();
    });
  }

  setMenuMode(_val: MenuMode) {
    this._config.menuMode = _val;
    if (this.isSlimPlus() || this.isSlim()) {
      this.resetMenu();
    }
    this.onConfigUpdate();
  }

  setLayoutTheme(layoutTheme: string) {
    this._config.layoutTheme = layoutTheme;
    this.onConfigUpdate();
  }

  private onConfigUpdate() {
    this.config.next(this._config);
    this.storage.set(E_STORAGE.THEME, JSON.stringify(this._config));
    //! TODO: Call api for update theme configuration
  }

  private applyScale() {
    document.documentElement.style.fontSize = this._config.scale + 'px';
    this.onConfigUpdate();
  }

  private replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-link';
    const themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  private setThemeLink() {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const linkSection = themeLinkHref?.split('/theme/');
    const newLink = `${linkSection?.[0]}/theme/theme-${this._config.colorScheme}/${this._config.theme}/theme.css`;
    themeLink.setAttribute('href', newLink);
  }
}
