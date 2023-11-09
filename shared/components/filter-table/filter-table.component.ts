import {Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {Dropdown} from 'primeng/dropdown';
import {Nullable} from 'primeng/ts-helpers';
import {MatchModeOptionsConst} from '../../../core/constants/table.const';
import {AppTableHeader, FilterValueType} from '../../../core/models/generic/table.model';
import {PublicService} from '../../../core/services/public.service';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent {
  @Input() header!: AppTableHeader;
  @Input() filters: any;
  @Input() dropdownList: any;
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();

  value: FilterValueType = new FilterValueType();
  matchMode: string = '';
  matchModeOption: any[] = [];
  overlayVisible: boolean | undefined;
  required: boolean = false;
  customTemplate: Nullable<TemplateRef<any>>;

  @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

  constructor(public ps: PublicService) {}

  ngOnInit() {
    this.setMatchModeOptions();
  }
  ngAfterContentInit() {
    (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
      if (item.getType() === 'appFilterTable') this.customTemplate = item.template;
    });
  }

  setMatchModeOptions() {
    if (this.header.columnFilter?.hideMatchModes !== true) {
      const type = this.header?.columnFilter?.templateType;
      if (this.header?.columnFilter?.matchModeOptions) {
        this.matchModeOption = this.header?.columnFilter?.matchModeOptions;
      } else {
        switch (type) {
          case 'DEFAULT':
          case 'NUMBER':
          case 'DATE_TIME':
          case 'DATE':
          case 'TIME':
          case 'HOUR_MINUTE':
          case 'BOOLEAN':
          case 'ARRAY':
          case 'BADGE':
          case 'OBJECT':
          case 'DROPDOWN': {
            this.matchModeOption = MatchModeOptionsConst[type];
            break;
          }
        }
      }
    }

    if (this.filters?.[this.header.field]) {
      this.matchMode = this.filters?.[this.header.field].matchMode;
      this.value = this.filters?.[this.header.field]._value;
    } else {
      this.matchMode = this.header.columnFilter?.matchMode || '';
    }

    const x = this.matchModeOption.find((match) => match.value === this.matchMode);
    this.value.type = x?.valueType || undefined;
  }

  onMatchModeChange(event: any, dp: Dropdown) {
    if (this.ps.hasValue(dp.selectedOption?.valueType)) {
      this.value.type = dp.selectedOption?.valueType;
    } else {
      this.value.type = undefined;
    }
    this.onValueChange();
  }

  onValueChange() {
    this.filters[this.header.field] = {
      field: this.header.columnFilter?.field || this.header.field,
      dataType: this.header.columnFilter?.dataType,
      type: this.header.columnFilter?.templateType,
      value: this.getValue(),
      matchMode: this.matchMode,
      _value: this.value
    };
    this.filterChanged.emit();
  }

  getValue() {
    if (this.value.type) {
      const val: any = {};
      Object.keys(this.value.type).forEach((element: any) => {
        val[element] = this.value[element as keyof typeof this.value];
      });
      return val;
    }
    return this.value.text;
  }
}
