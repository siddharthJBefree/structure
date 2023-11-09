import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  @Input() showPanel: boolean = false;
  @Output() showPanelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  notificationList = [
    {
      type: 'info',
      title: 'Welcome to Befree',
      description: 'Worm welcome to befree, You will have the best experience here'
    },
    {
      type: 'success',
      title: 'Your Salary Has been credited',
      description: 'Yaa hu !!!!'
    },
    {
      type: 'danger',
      title: 'Task Deadline due',
      description: 'Oops!!!'
    }
  ];

  hidePanel(visible: boolean) {
    this.showPanelChange.emit(visible);
  }
}
