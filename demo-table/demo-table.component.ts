import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {TableLazyLoadEvent} from 'primeng/table';
import {Subscription} from 'rxjs';
import {API_ROUTES} from '../core/constants/api-routes.const';
import {Debounce} from '../core/decorators/debounce.decorator';
import {AppFilterData, AppTable, AppTableHeaderList} from '../core/models/generic/table.model';
import {ApiService} from '../core/services/api.service';
import {DesignService} from '../core/services/design.service';
import {PublicService} from '../core/services/public.service';
import {SharedModule} from '../shared/shared.module';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DemoTableComponent {
  tableData: any = [
    {
      id: 1,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 0,
      _link: 'https://www.google.com/',
      _multi_link: 'https://www.google.com/, https://www.google.com/'
    },
    {
      id: 2,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 1
    },
    {
      id: 3,
      _string: 'test bank',
      _number: 0,
      _date: new Date(),
      _badge: 0,
      _json: {
        test: 'test'
      }
    }
  ];

  ref: DynamicDialogRef | undefined;
  appTable = new AppTable();
  headerList: AppTableHeaderList = [
    {
      field: 'id',
      title: 'Index',
      classList: 'text-nowrap',
      sortable: true,
      minWidth: '80px',
      align: 'CENTER',
      type: 'INDEX'
    },
    {
      field: '_string',
      title: 'String',
      minWidth: '80px',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        templateType: 'DEFAULT',
        matchMode: ''
      }
    },
    {
      field: '_number',
      title: 'Number',
      minWidth: '150px',
      type: 'NUMBER',
      typeConfig: {
        default: 0,
        decimal: 3
      },
      align: 'RIGHT',
      columnFilter: {
        show: true,
        templateType: 'NUMBER'
      }
    },
    {
      field: '_date',
      title: 'Date Time',
      minWidth: '150px',
      type: 'DATE_TIME',
      columnFilter: {
        show: true,
        templateType: 'DATE_TIME',
        matchMode: 'equal'
      }
    },
    {
      field: '_date',
      title: 'Date',
      minWidth: '150px',
      type: 'DATE',
      columnFilter: {
        show: true,
        templateType: 'DATE',
        matchMode: 'equal'
      }
    },
    {
      field: '_date',
      title: 'Time',
      minWidth: '150px',
      type: 'TIME',
      columnFilter: {
        show: true,
        templateType: 'TIME',
        matchMode: 'equal'
      }
    },
    {
      field: '_date',
      title: 'Hour Minute',
      minWidth: '150px',
      type: 'HOUR_MINUTE',
      columnFilter: {
        show: true,
        templateType: 'HOUR_MINUTE',
        matchMode: 'equal'
      }
    },
    {
      field: '_badge',
      title: 'Badge',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: [
          {
            value: 0,
            type: 'danger',
            label: 'Inactive'
          },
          {
            value: 1,
            type: 'success',
            label: 'Active'
          }
        ]
      },
      columnFilter: {
        show: true,
        templateType: 'BADGE',
        matchMode: 'equal'
      }
    },
    {
      field: '_link',
      title: 'Link',
      minWidth: '150px',
      type: 'LINK',
      typeConfig: {
        routerLink: (data: string, dataItem: any) => {
          return {link: 'test' + data, text: 'Click Here', target: '_blank', class: '', disabled: false};
        }
      }
    },
    {
      field: '_multi_link',
      title: 'Multi Link',
      minWidth: '150px',
      type: 'MULTI_LINK',
      typeConfig: {
        linkSeparator: ',',
        routerLink: (data: any, dataItem: any) => {
          return {link: data, text: 'Click Here', target: '_blank', class: '', disabled: false};
        }
      }
    },
    {
      field: '_json',
      title: 'JSON',
      minWidth: '150px',
      type: 'JSON'
    },
    {
      field: 'action',
      title: 'Action',
      frozen: true,
      frozenAlign: 'right',
      minWidth: '300px',
      type: 'CUSTOM'
    }
  ];
  initialFilter: AppFilterData = {};
  permanentFilter: AppFilterData = {};

  flags: any = {
    isAddOrEditDialog: false
  };

  sb: {
    tableData?: Subscription;
    confirmation?: Subscription;
  } = {};

  constructor(
    private api: ApiService,
    private _fb: FormBuilder,
    private ds: DesignService,
    public ps: PublicService
  ) {}

  ngOnInit() {
    this.appTable.setHeaderList(this.headerList);
    this.appTable.setFilter(this.initialFilter, this.permanentFilter);

    this.ds.setBreadcrumbs([{label: 'demo-table', routerLink: '/demo-table'}]);
    this.ds.setPageTitle('Demo Table');
  }

  getTableData() {
    this.appTable.loading = true;
    const params = this.appTable.getTableParams();

    this.sb.tableData?.unsubscribe();
    this.sb.tableData = this.api.get(API_ROUTES.bankMaster, params).subscribe((res) => {
      this.tableData = res.payload.data;
      this.appTable.totalRecords = +(res.pager.totalRecords || 0);
      this.appTable.recordsPerPage = +(res.pager.recordsPerPage || 0);
      this.appTable.pageNumber = +(res.pager.pageNumber || 0);

      setTimeout(() => {
        this.appTable.loading = false;
      }, 0);
    });
  }

  @Debounce(300)
  onLazyLoad(event: TableLazyLoadEvent) {
    this.appTable.loading = false;
    // this.getTableData();
  }

  @Debounce(300)
  onFilter() {
    setTimeout(() => {
      this.getTableData();
    }, 0);
  }

  @Debounce(300)
  onResetFilter() {
    this.appTable.resetFilters();
    setTimeout(() => {
      this.getTableData();
    }, 0);
  }

  headerTrackBy(index: number, header: {field: string}) {
    return header.field;
  }

  exportExcel() {}
  exportPdf() {}

  ngOnDestroy() {
    Object.values(this.sb).forEach((element) => {
      element?.unsubscribe();
    });
  }
}
