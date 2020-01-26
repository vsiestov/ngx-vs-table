import { Pipe, PipeTransform } from '@angular/core';
import { ISortConfig } from '../interfaces/ngx-vs-table.interface';
import { orderBy } from 'lodash-es';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sortConfig: ISortConfig): any {
    if (!sortConfig || !Object.keys(sortConfig).length) {
      return value;
    }

    if (!Array.isArray(value)) {
      return [];
    }

    const func = sortConfig.sortFunction || sortConfig.property;

    return orderBy(value, func ? func : [sortConfig.key], sortConfig.direction);
  }
}
