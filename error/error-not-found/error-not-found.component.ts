import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from 'projects/admin/src/environments/environment';
import {filter} from 'rxjs';
import {PublicService} from '../../core/services/public.service';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.scss']
})
export class ErrorNotFoundComponent {
  showError: boolean = false;
  error: any = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ps: PublicService
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      if (!!res?.error) {
        this.error = JSON.parse(res?.error);
      } else {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
          const previousUrl = environment.CLIENT_URL.slice(0, -1) + event.url;
          this.error = {url: previousUrl, status: 404, ok: false, message: 'Page not found'};
        });
      }
    });
  }
}
