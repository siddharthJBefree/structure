import {Component} from '@angular/core';
import * as moment from 'moment';
import {environment} from 'projects/admin/src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  year = moment().year();
  platform = environment.PLATFORM;
}
