import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import * as moment from 'moment';
import {DataFormatType} from '../../../core/enums/data-format-type.enum';
import {DataFormatTypeConfig} from '../../../core/models/generic/data-format-type-config.model';
import {PublicService} from '../../../core/services/public.service';

@Component({
  selector: 'app-data-format',
  templateUrl: './data-format.component.html',
  styleUrls: ['./data-format.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataFormatComponent {
  @Input() data: any = '';
  @Input() dataItem: any;
  @Input() type: undefined | keyof typeof DataFormatType;

  @Input() config: DataFormatTypeConfig | undefined;
  decimal: number = 0;
  @Input() rowIndex: number = 0;
  @Input() default: string | number | undefined;

  constructor(public ps: PublicService) {}

  ngOnInit(): void {
    if (this.config?.decimal === 0 || !!this.config?.decimal) this.decimal = this.config?.decimal;

    if (this.config?.default) this.default = this.config?.default;

    if (this.type === DataFormatType.DATE && !!this.data && typeof this.data === 'string') {
      this.data = new Date(this.data);
    }

    if (this.type === DataFormatType.TIME && !!this.data && typeof this.data === 'string') {
      this.data = moment(this.data, 'HH:mm:ss').toDate();
    }

    if (this.type === DataFormatType.HOUR_MINUTE && !!this.data && typeof this.data === 'string') {
      this.data = moment(this.data, 'HH:mm').toDate();
    }
  }
}
