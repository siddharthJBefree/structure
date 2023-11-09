import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SHORTCUT_KEY} from '../../../core/constants/shortcut-key.const';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true
    }
  ]
})
export class SearchComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Search [ Alt + / ]';
  @Input() icon: string = 'pi pi-search';
  @Input() accessKey: string = SHORTCUT_KEY.SEARCH;

  @Output() search: EventEmitter<string> = new EventEmitter();

  value = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
    this.search.emit(value);
  }

  onSearch(event: Event): void {
    const value = (event.target as any).value;
    this.writeValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
