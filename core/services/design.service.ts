import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {BehaviorSubject} from 'rxjs';
import {Debounce} from '../decorators/debounce.decorator';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private static isAlreadyInitialized = false;
  msg: MessageService;
  confirm: ConfirmationService;
  router: Router;
  dsg: DialogService;

  private readonly _breadcrumbs$ = new BehaviorSubject<MenuItem[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
  private readonly _pageTitle$ = new BehaviorSubject<string>('');
  readonly pageTitle$ = this._pageTitle$.asObservable();

  _loaderCount = 0;
  private loader = new BehaviorSubject<boolean>(false);
  loader$ = this.loader.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private routerService: Router
  ) {
    if (DesignService.isAlreadyInitialized === true) {
      alert("Don't Reinitialize(Provide) Design Service");
    } else {
      DesignService.isAlreadyInitialized = true;
    }

    this.msg = this.messageService;
    this.confirm = this.confirmationService;
    this.router = this.routerService;
    this.dsg = this.dialogService;
  }

  @Debounce(300)
  setBannerHeight() {
    const banner: HTMLDivElement | null = document.querySelector('.layout-banner');
    const height = banner?.offsetHeight || 0;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--banner-height', `${height}px`);
  }

  @Debounce(300)
  setHeaderHeight() {
    const header: HTMLDivElement | null = document.querySelector('.layout-topbar');
    const height = header?.offsetHeight || 0;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--header-height', `${height}px`);
  }

  @Debounce(300)
  setSubHeaderHeight() {
    const subHeader: HTMLDivElement | null = document.querySelector('.layout-sub-header');
    const height = subHeader?.offsetHeight || 0;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--sub-header-height', `${height}px`);
  }

  @Debounce(300)
  setFooterHeight() {
    const footer: HTMLDivElement | null = document.querySelector('.layout-footer');
    const height = footer?.offsetHeight || 0;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--footer-height', `${height}px`);
  }

  showNotification(notify: any) {
    notify.forEach((item: any) => {
      if (!!item) {
        this.msg.add({
          summary: 'Success',
          detail: item,
          severity: 'success'
        });
      }
    });
  }

  showError(error: any) {
    console.log('TCL: DesignService -> showError -> error', error);
    if (error?.error?.STATUS?.NOTIFICATION) {
      const notify = error?.error?.STATUS?.NOTIFICATION;

      notify.forEach((item: any) => {
        if (!!item) {
          this.msg.add({
            summary: 'Error',
            detail: item,
            severity: 'error'
          });
        }
      });
    } else {
      this.msg.add({
        summary: 'Error',
        detail: error?.error?.message || error?.error || error,
        severity: 'error'
      });
    }
  }

  showSuccess(summary: string, detail: string) {
    this.msg.add({
      summary: summary,
      detail: detail,
      severity: 'success'
    });
  }

  showWarning(summary: string, detail: string) {
    this.msg.add({
      summary: summary,
      detail: detail,
      severity: 'warning'
    });
  }

  isOnline() {
    const onlineHandler = () => {
      this.document.body.classList.remove('internet-offline');
      if (DesignService.isAlreadyInitialized) {
        this.showSuccess('Online', 'Congrats!!! You are Online');
      }
    };

    const offlineHandler = () => {
      this.document.body.classList.add('internet-offline');
      this.msg.add({
        summary: 'Offline',
        detail: 'Opps!!! Your Internet is not working',
        severity: 'error'
      });
    };

    window.addEventListener('online', onlineHandler.bind(this));
    window.addEventListener('offline', offlineHandler.bind(this));
  }

  setBreadcrumbs(breadcrumbs: Array<MenuItem>): void {
    this._breadcrumbs$.next(breadcrumbs);
  }

  setPageTitle(pageTitle: string): void {
    this._pageTitle$.next(pageTitle);
  }

  setLoader(loader: boolean) {
    if (loader) {
      this._loaderCount += 1;
      if (loader) {
        this.loader.next(true);
      }
    } else {
      this._loaderCount--;
      if (this._loaderCount <= 0) {
        this._loaderCount = 0;
        this.loader.next(false);
      }
    }
    console.log('TCL: DesignService -> setLoader -> this._loaderCount', this._loaderCount);
  }
}
