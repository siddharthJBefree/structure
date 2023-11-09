import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../../core/services/public.service';

@Component({
  selector: 'app-error-method-not-allowed',
  templateUrl: './error-method-not-allowed.component.html',
  styleUrls: ['./error-method-not-allowed.component.scss']
})
export class ErrorMethodNotAllowedComponent {
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
