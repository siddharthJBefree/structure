import {Component} from '@angular/core';
import {AppConfig, LayoutState} from '../core/models/generic/layout.model';
import {LayoutService} from '../core/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  config!: AppConfig;
  state!: LayoutState;
  containerClass = {};

  constructor(private layoutService: LayoutService) {
    this.layoutService.config$.subscribe((_config: AppConfig) => {
      this.config = _config;
      this.setContainerClass();
    });
    this.layoutService.state$.subscribe((_state: LayoutState) => {
      this.state = _state;
      this.setContainerClass();
    });
  }

  setContainerClass() {
    this.containerClass = {
      'layout-slim': this.config?.menuMode === 'slim',
      'layout-slim-plus': this.config?.menuMode === 'slim-plus',
      'layout-static': this.config?.menuMode === 'static',
      'layout-overlay': this.config?.menuMode === 'overlay',
      'layout-overlay-active': this.state?.overlayMenuActive,
      'layout-mobile-active': this.state?.staticMenuMobileActive,
      'layout-static-inactive': this.state?.staticMenuDesktopInactive && this.config?.menuMode === 'static',
      'p-input-filled': this.config?.inputStyle === 'filled',
      'p-ripple-disabled': !this.config?.ripple,
      'layout-light': this.config?.layoutTheme === 'colorScheme' && this.config?.colorScheme === 'light',
      'layout-dark': this.config?.layoutTheme === 'colorScheme' && this.config?.colorScheme === 'dark',
      'layout-primary': this.config?.colorScheme !== 'dark' && this.config?.layoutTheme === 'primaryColor'
    };
  }
}
