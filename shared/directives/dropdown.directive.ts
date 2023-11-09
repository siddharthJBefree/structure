import {Directive, EventEmitter, Input, Optional, Output} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Dropdown} from 'primeng/dropdown';
import {Observable} from 'rxjs';
import {DesignService} from '../../core/services/design.service';

interface IDropdownOptions {
  apiSideFilter?: boolean;
  options?: Array<IDropdownItem>;
  api?: Observable<any>;
  dataPath?: string;

  label?: string;
  value?: string;
}

interface IDropdownItem {
  text: '';
  value: '';
  data?: '';
  flags?: '';
}

@Directive({
  selector: 'p-dropdown[appDropdown]'
})
export class DropdownDirective {
  @Input({required: true}) appDropdown: IDropdownOptions | undefined;

  @Output() comboData: EventEmitter<any> = new EventEmitter();

  constructor(
    public ds: DesignService,
    private dropdown: Dropdown,
    @Optional() private control: NgControl
  ) {}

  ngOnInit() {
    if (!this.dropdown) {
      return alert('Add Form Control Name');
    }

    if (this.appDropdown) {
      // this.el.virtualScroll = true;
      this.dropdown.filter = true;
      this.dropdown.showClear = true;
      this.dropdown.autofocusFilter = true;
      this.dropdown.autoDisplayFirst = false;
      this.dropdown.resetFilterOnHide = true;
      this.dropdown.styleClass = 'w-full';
      this.dropdown.appendTo = 'body';
      this.dropdown.optionLabel = this.appDropdown?.label || 'label';
      this.dropdown.optionValue = this.appDropdown?.value || 'key';

      if (Array.isArray(this.appDropdown.options)) {
        this.dropdown.options = this.appDropdown.options;
      }

      this.callSwitchApi();
    }
  }

  callSwitchApi() {
    if (this.appDropdown?.api) {
      this.appDropdown.api.subscribe({
        next: (success: any) => {
          if (this.dropdown) {
            if (this.appDropdown?.dataPath) {
              const path = this.appDropdown?.dataPath.split('.');
              const data = path.reduce((value, entry) => value[entry] || [], success);

              this.dropdown.options = data;
            } else {
              this.dropdown.options = success;
            }
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
}
