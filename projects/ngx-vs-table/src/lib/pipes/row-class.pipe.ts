import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowClass'
})
export class RowClassPipe implements PipeTransform {
  transform(value: any, fn: (prop) => string): string {
    if (fn && typeof fn === 'function') {
      return fn(value);
    }

    return '';
  }
}
