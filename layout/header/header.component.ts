import {Component} from '@angular/core';
import {ConfirmEventType, MenuItem} from 'primeng/api';
import {Debounce} from '../../core/decorators/debounce.decorator';
import {DesignService} from '../../core/services/design.service';
import {LayoutService} from '../../core/services/layout.service';
import {PublicService} from '../../core/services/public.service';
import {AuthService} from './../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logo = '/assets/images/befree_white_ico.png';
  tabMenu: MenuItem[] | undefined;
  searchActive: boolean = false;

  flags = {
    isFullScreen: false,
    notificationPanel: false
  };

  profileMenuList: MenuItem[] = [
    {
      id: 'PROFILE',
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/admin/profile'
    },
    {
      id: 'THEME_CHANGE',
      label: 'Theme Change',
      icon: 'pi pi-sliders-h',
      command: () => this.showConfigSidebar()
    },
    {
      id: 'FULLSCREEN',
      label: this.flags.isFullScreen ? 'Minimize' : 'Maximize',
      icon: this.flags.isFullScreen ? 'pi pi-window-minimize' : 'pi pi-window-maximize',
      command: () => this.onFullscreenChange(),
      badge: 'F11',
      badgeStyleClass: 'p-badge p-badge-secondary ml-auto opacity-50'
    },
    {
      id: 'RELEASE_NOTES',
      label: 'Release Notes',
      icon: 'pi pi-book',
      routerLink: '/release-notes'
    },
    {
      id: 'LOGOUT',
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout()
    },
    {
      id: 'LOGOUT_WITH_PUNCH_OUT',
      label: 'Logout with Punch Out',
      icon: 'pi pi-power-off',
      command: () => this.authService.logout()
    }
  ];
  searchInput: any;

  constructor(
    private ds: DesignService,
    private authService: AuthService,
    public ps: PublicService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.setHeaderMenu();
  }

  @Debounce(300)
  onResizeBanner() {
    this.ds.setBannerHeight();
  }

  @Debounce(300)
  onResizeHeader() {
    this.ds.setHeaderHeight();
  }

  onFullscreenChange() {
    if (!document.fullscreenElement) {
      this.flags.isFullScreen = true;
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      this.flags.isFullScreen = false;
      document.exitFullscreen();
    }

    const index = this.profileMenuList.findIndex((i) => i.id === 'FULLSCREEN');

    this.profileMenuList.splice(index, 1, {
      id: 'FULLSCREEN',
      label: this.flags.isFullScreen ? 'Minimize' : 'Maximize',
      icon: this.flags.isFullScreen ? 'pi pi-window-minimize' : 'pi pi-window-maximize',
      command: () => this.onFullscreenChange(),
      badge: 'F11',
      badgeStyleClass: 'p-badge p-badge-secondary ml-auto opacity-50'
    });
  }

  onPunchOut(event: Event) {
    this.ds.confirm.confirm({
      key: 'popup',
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Punch out?',
      icon: 'pi pi-power-off',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-outlined',
      accept: () => {
        this.ds.msg.add({severity: 'success', summary: 'Punched out !!!', detail: 'You have been Punched out'});
      },
      reject: (reject: ConfirmEventType) => {
        console.log('🚀 ~ file: ~ activeInactiveAccount ~ reject:', reject);
        // this.ds.msg.add({severity: 'info', summary: 'No action'});
      }
    });
  }

  onMenuToggle() {
    this.layoutService.onMenuToggle();
  }

  setHeaderMenu() {
    this.authService.userRights.subscribe((userRights) => {
      if (this.ps.hasValueType(userRights, 'object')) {
        const mapList: any = {};
        const roots: any = [];

        userRights.forEach((right) => {
          mapList[right.id.toString()] = {
            id: right.id,
            parentId: right.parent_id,
            rights: {
              view: right.view,
              create: right.add_edit,
              edit: right.add_edit,
              delete: right.delete,
              export: right.export,
              download: right.download,
              otherRights: right.otherRights
            },
            label: right.tab_name,
            // visible: right.view ? true : false,
            routerLink: right.route_name,
            breadcrumb: [],
            items: undefined
          };
        });

        Object.values(mapList).forEach((right: any) => {
          if (right.parentId === 0) {
            roots.push(right);
          } else {
            if (this.ps.hasValueType(mapList[right.parentId]?.items, 'array')) {
              mapList[right.parentId]?.items?.push(right);
            } else {
              mapList[right.parentId].items = [];
              mapList[right.parentId]?.items?.push(right);
            }
          }
        });

        this.tabMenu = roots as Array<MenuItem>;
      }
    });
  }
  get tabs(): MenuItem[] {
    return this.layoutService.tabs;
  }
  removeTab(event: MouseEvent, item: MenuItem, index: number) {
    this.layoutService.onTabClose(item, index);
    event.preventDefault();
  }

  activateSearch() {
    this.searchActive = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }
  deactivateSearch() {
    this.searchActive = false;
  }

  showConfigSidebar() {
    this.layoutService.showConfigSidebar();
  }
}
