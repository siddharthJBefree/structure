import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateCompare'
})
export class DateComparePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
