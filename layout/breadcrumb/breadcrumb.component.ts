import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DesignService} from '../../core/services/design.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  home = {icon: 'pi pi-home', routerLink: '/'};
  pageTitle: string = '';
  breadcrumbs: Array<MenuItem> = [];

  constructor(private ds: DesignService) {
    this.ds.breadcrumbs$.subscribe((data) => (this.breadcrumbs = data));
    this.ds.pageTitle$.subscribe((data) => (this.pageTitle = data));
  }

  onResize() {
    this.ds.setSubHeaderHeight();
  }
}
