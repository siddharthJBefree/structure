import {Component} from '@angular/core';
import {environment} from '../../environments/environment';
import {ApiService} from '../core/services/api.service';
import {PublicService} from '../core/services/public.service';
import {SharedModule} from '../shared/shared.module';
type ReleaseNote = Array<{
  version: string;
  title: string;
  pointList: Array<{title: string; content: string} | string>;
}>;

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ReleaseNotesComponent {
  releaseNotes: ReleaseNote = [];

  constructor(
    private api: ApiService,
    public ps: PublicService
  ) {
    let url = '';
    switch (environment.PLATFORM) {
      case 'PRODUCTION':
        url = '/assets/json/release/release-notes.json';
        break;
      case 'STAGE':
        url = '/assets/json/release/release-notes.stage.json';
        break;
      default:
        url = '/assets/json/release/release-notes.qa.json';
        break;
    }

    this.api.getJsonFile(url, {}).subscribe({
      next: (success: ReleaseNote) => {
        this.releaseNotes = success as ReleaseNote;
      },
      error: (error) => {}
    });
  }

  getData(value: {title: string; content: string} | string) {
    if (typeof value === 'string') {
      return {title: '', content: value};
    }
    return value;
  }
}
