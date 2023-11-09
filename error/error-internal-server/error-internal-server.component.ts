import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PublicService} from '../../core/services/public.service';

@Component({
  selector: 'app-error-internal-server',
  templateUrl: './error-internal-server.component.html',
  styleUrls: ['./error-internal-server.component.scss']
})
export class ErrorInternalServerComponent {
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
