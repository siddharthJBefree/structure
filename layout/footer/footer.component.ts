import {Component} from '@angular/core';
import {environment} from 'projects/admin/src/environments/environment.development';
import {Debounce} from '../../core/decorators/debounce.decorator';
import {DesignService} from '../../core/services/design.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  platform = environment.PLATFORM;

  constructor(private ds: DesignService) {}

  @Debounce(300)
  onResize() {
    this.ds.setFooterHeight();
  }
}
