import {Component, Input} from '@angular/core';
import {CheckboxChangeEvent} from 'primeng/checkbox';
import {AppConfig, ColorScheme, LayoutState, MenuMode} from '../../core/models/generic/layout.model';
import {LayoutService} from './../../core/services/layout.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  @Input() minimal: boolean = false;

  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'slim',
    colorScheme: 'light',
    theme: 'indigo',
    layoutTheme: 'colorScheme',
    scale: 14
  };

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  };

  componentThemes: any[] = this.layoutService.componentThemes;

  scales: number[] = [12, 13, 14, 15, 16];

  constructor(public layoutService: LayoutService) {
    this.layoutService.config$.subscribe((_config: AppConfig) => {
      this.config = _config;
    });
    this.layoutService.state$.subscribe((_state: LayoutState) => {
      this.state = _state;
    });
  }

  ngOnInit() {}

  changeColorScheme(colorScheme: ColorScheme) {
    this.layoutService.setColorScheme(colorScheme);
  }

  changeTheme(theme: string) {
    this.layoutService.setTheme(theme);
  }
  setLayoutTheme(layoutTheme: string) {
    this.layoutService.setLayoutTheme(layoutTheme);
  }

  setMenuMode(menuMode: MenuMode) {
    this.layoutService.setMenuMode(menuMode);
  }

  decrementScale() {
    this.layoutService.decrementScale();
  }

  incrementScale() {
    this.layoutService.incrementScale();
  }

  setRipple(event: CheckboxChangeEvent) {
    this.layoutService.setRipple(event.checked);
  }

  setInputStyle(event: any) {
    this.layoutService.setInputStyle(event);
  }
}
