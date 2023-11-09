import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {APP_ROUTES} from '../../core/constants/routes.const';
import {DesignService} from '../../core/services/design.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarVisibility: boolean = true;
  sidebarMenuList: MenuItem[] = [
    {
      id: 'DASHBOARD',
      label: 'Dashboard',
      icon: 'pi pi-desktop',
      routerLink: APP_ROUTES.adminDashboard
    },
    {
      id: 'PROFILE',
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: APP_ROUTES.profile
    },
    {
      id: 'ADMINISTRATOR',
      label: 'Administrator',
      icon: 'pi pi-prime',
      items: [
        {
          id: 'DESIGNATION',
          label: 'Designation',
          icon: 'pi pi-sitemap',
          routerLink: APP_ROUTES.designation
        },
        {
          id: 'MANAGE_USER',
          label: 'Manage User',
          icon: 'pi pi-users',
          routerLink: APP_ROUTES.manageUser
        },
        {
          id: 'MANAGE_ACCOUNT_TYPE',
          label: 'Account Type',
          icon: 'pi pi-book',
          routerLink: APP_ROUTES.accountType
        },
        {
          id: 'MANAGE_BANK_INFORMATION',
          label: 'Bank Information',
          icon: 'pi pi-home',
          routerLink: APP_ROUTES.bankInformation
        },
        {
          id: 'MANAGE_BEFREE_COMMENTS',
          label: 'Befree Comments',
          icon: 'pi pi-whatsapp',
          routerLink: APP_ROUTES.befreeComments
        },
        {
          id: 'MANAGE_PARTICULAR_TYPE',
          label: 'Particular Type',
          icon: 'pi pi-home',
          routerLink: APP_ROUTES.particularType
        },
        {
          id: 'MANAGE_QUOTE_GROUP',
          label: 'Quote Group',
          icon: 'pi pi-question-circle',
          routerLink: APP_ROUTES.quoteGroup
        },
        {
          id: 'MANAGE_QUOTE_QUESTION',
          label: 'Quote Question',
          icon: 'pi pi-question-circle',
          routerLink: APP_ROUTES.quoteQuestion
        }
      ]
    },
    {
      id: 'LEAVE_DETAILS',
      label: 'Leave Details',
      icon: 'pi pi-calendar',
      items: [
        {
          id: 'LEAVE_TRACKERS',
          label: 'Leave Trackers',
          icon: 'pi pi-chart-line',
          routerLink: '/leave-trackers'
        },
        {
          id: 'APPLY_LEAVE',
          label: 'Apply Leave',
          icon: 'pi pi-calendar-minus',
          routerLink: '/apply-leaves'
        },
        {
          id: 'LEAVE_LIST',
          label: 'Leave List',
          icon: 'pi pi-list',
          routerLink: '/leave-list'
        }
      ]
    },
    {
      id: 'AWARDS',
      label: 'awards',
      icon: 'pi pi-megaphone',
      routerLink: '/awards'
    },
    {
      id: 'HOLIDAY_WORKING',
      label: 'Holiday Working',
      icon: 'pi pi-briefcase',
      items: [
        {
          id: 'APPLY_HOLIDAY_WORKING',
          label: 'Apply Holiday Working',
          icon: 'pi pi-calendar-plus',
          routerLink: '/apply-holiday-working'
        },
        {
          id: 'HOLIDAY_WORKING_LIST',
          label: 'Holiday Working List',
          icon: 'pi pi-list',
          routerLink: '/holiday-working-list'
        }
      ]
    },
    {
      id: 'RELEASE_NOTES',
      label: 'Release Notes',
      icon: 'pi pi-book',
      routerLink: APP_ROUTES.releaseNotes
    }
  ];

  constructor(private ds: DesignService) {}

  ngOnInit() {}
}
