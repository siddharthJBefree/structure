import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../../core/services/public.service';

@Component({
  selector: 'app-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent {
  showError: boolean = false;
  error: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    public ps: PublicService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      if (!!res?.error) {
        this.error = JSON.parse(res?.error);
      }
    });
  }
}
