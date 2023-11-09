import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BannerComponent} from './banner/banner.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {ConfigComponent} from './config/config.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LayoutComponent} from './layout.component';
import {NotificationComponent} from './notification/notification.component';
import {AppMenuitemComponent} from './sidebar/app.menuitem.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotificationComponent,
    BannerComponent,
    ConfigComponent,
    BreadcrumbComponent,
    AppMenuitemComponent,
    LayoutComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, ConfigComponent, BreadcrumbComponent]
})
export class LayoutModule {}
