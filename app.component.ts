import {Component} from '@angular/core';
import {DesignService} from './core/services/design.service';
import {LayoutService} from './core/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader$: any;

  constructor(
    private layoutService: LayoutService,
    private ds: DesignService
  ) {}

  ngOnInit(): void {
    this.layoutService.config$.subscribe();
    this.loader$ = this.ds.loader$;
    this.ds.isOnline();
  }
}
