import {TablePageEvent} from 'primeng/table';
import {DataFormatType} from '../../enums/data-format-type.enum';
import {HasValue} from '../../functions/has-value.function';
import {DataFormatTypeConfig} from '../../models/generic/data-format-type-config.model';

export class AppTable {
  private search: string = '';
  pageNumber: number = 1;
  recordsPerPage: number = 25;
  totalRecords: number = 0;
  sortBy: string = '';
  sortOrder: string = '';
  rowsPerPageOptions: Array<number> = [5, 10, 25, 50, 100, 150, 250, 500];
  loading: boolean = true;
  smallTable?: boolean | null = undefined;
  showFilterRow?: boolean = false;
  headerList: AppTableHeaderList = [];
  selectedColumns: AppTableHeaderList = [];
  filters: AppFilterData = {};
  private permanentFilter: AppFilterData = {};

  getTableParams = () => {
    // Set Permanent Filter
    if (HasValue(this.permanentFilter)) {
      Object.entries(this.permanentFilter).forEach(([key, value]) => {
        this.filters[key] = JSON.parse(JSON.stringify(value));
      });
    }

    const finalFilter: any[] = [];
    Object.entries(this.filters).forEach(([key, value]) => {
      delete value._value;
      if (HasValue(value.value)) {
        finalFilter.push(value);
      }
    });

    if (HasValue(finalFilter)) {
      this.search = JSON.stringify(finalFilter);
    } else {
      this.search = '';
    }

    return {
      pageNumber: this.pageNumber,
      recordsPerPage: this.recordsPerPage,
      ...(this.sortBy && {sortBy: this.sortBy}),
      ...(this.sortOrder && {sortOrder: this.sortOrder}),
      ...(this.search && {search: this.search})
    };
  };

  setHeaderList(value: AppTableHeaderList) {
    this.headerList = value;
    this.selectedColumns = value;
  }

  setFilter(initial: AppFilterData, permanent: AppFilterData) {
    this.filters = initial;
    this.permanentFilter = permanent;
  }

  onRecordsPerPageChange(recordsPerPage: number) {
    this.recordsPerPage = recordsPerPage;
  }

  onSort(event: TableSortEvent) {
    this.sortBy = event.field;
    this.sortOrder = event.order === 1 ? 'asc' : 'desc';
  }

  onPageChange(event: TablePageEvent | undefined = undefined) {
    if (!!event?.first && !!event?.rows) {
      this.pageNumber = event?.first / event?.rows + 1;
    } else {
      this.pageNumber = 1;
    }
  }

  hideColumn(header: any): boolean {
    if (typeof header?.hideFun === 'function') {
      return !header?.hideFun();
    }
    if (header?.hide === true) {
      return false;
    }
    return true;
  }

  resetFilters() {
    this.showFilterRow = false;
    this.filters = {};
  }
}

export interface AppTableHeaderList extends Array<AppTableHeader> {}

export interface AppTableHeader {
  field: string;
  title: string;
  classList?: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  type?: keyof typeof DataFormatType;
  typeConfig?: DataFormatTypeConfig;
  hide?: boolean;
  hideFun?: Function;
  align?: 'RIGHT' | 'CENTER' | 'LEFT';
  frozen?: boolean;
  frozenAlign?: 'right' | 'left';
  format?: string;
  columnFilter?: ColumnFilter;
}

export class ColumnFilter {
  show: boolean = false;
  templateType: TemplateType | string = 'DEFAULT';
  field?: string;
  classList?: string;
  hideMatchModes?: boolean;
  matchMode?: string;
  matchModeOptions?: Array<{label: string; value: string}>;
  dataType?: 'string' | 'date' | 'number' | 'object' | 'array';
  decimal?: number;
  default?: string | number;
  format?: string;
  required?: boolean;
  value?: FilterValueType = new FilterValueType();
  dropdownConfig?: {
    listName: string;
    label: string;
    value: string;
  };
}

export interface AppFilterData {
  [key: string]: any;
}

export interface TableSortEvent {
  field: string;
  order: number;
}

export type TemplateType =
  | 'DEFAULT'
  | 'NUMBER'
  | 'DATE_TIME'
  | 'DATE'
  | 'TIME'
  | 'HOUR_MINUTE'
  | 'BADGE'
  | 'DROPDOWN'
  | 'BOOLEAN'
  | 'ARRAY'
  | 'OBJECT';
export class FilterValueType {
  text: string = '';
  from: string = '';
  to: string = '';
  type?: any;
}
