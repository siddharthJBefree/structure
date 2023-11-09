import {MenuItem} from 'primeng/api';

export type MenuMode = 'static' | 'overlay' | 'slim-plus' | 'slim';

export type ColorScheme = 'light' | 'dark';

export interface AppConfig {
  inputStyle: string;
  colorScheme: ColorScheme;
  theme: string;
  ripple: boolean;
  menuMode: MenuMode;
  layoutTheme: string;
  scale: number;
}

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}
export interface TabCloseEvent {
  tab: MenuItem;
  index: number;
}

export interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}
