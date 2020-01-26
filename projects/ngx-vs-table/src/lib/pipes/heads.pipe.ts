import { Pipe, PipeTransform } from '@angular/core';
import {
  IFilterSettings,
  IHead,
  IHeadKey,
  ISortConfig,
  ITableFilter,
  ITableHeadCell,
  ITableSettings
} from '../interfaces/ngx-vs-table.interface';
import { retry } from 'rxjs/operators';

@Pipe({
  name: 'heads'
})
export class HeadsPipe implements PipeTransform {
  transform(settings: ITableSettings, keyList: IHeadKey[][], sortConfig: ISortConfig): IHead {
    if (
      !settings ||
      (settings.head && settings.head.invisible) ||
      !Array.isArray(keyList)
    ) {
      return {
        heads: [],
        filters: [],
        hasFilter: false
      };
    }

    const { head } = settings;
    const stickyHead = head && head.hasOwnProperty('sticky') ? head.sticky : false;
    const filters = [];

    const heads = keyList.map((item) => {
      const key = item[0];

      if (key.filter) {
        const placeholder = typeof key.title === 'string'
          ? key.title as string
          : '';

        if (typeof key.filter === 'boolean') {
          filters.push({
            type: 'text',
            placeholder,
            key: key.value
          });
        } else if (typeof key.filter === 'object' && key.filter.constructor === Object) {
          filters.push({
            ...(key.filter as IFilterSettings),
            key: key.value,
            placeholder: (key.filter as IFilterSettings).placeholder || placeholder
          });
        }
      } else {
        filters.push(null);
      }

      return {
        key: key.value,
        title: key.title,
        sortable: key.hasOwnProperty('sortable')
          ? key.sortable
          : true,
        direction: sortConfig && sortConfig.key === key.value ? sortConfig.direction : null,
        property: key.property,
        sortFunction: key.sortFunction,
        sticky: stickyHead,
        stickyColumn: key.hasOwnProperty('sticky') ? key.sticky : false
      };
    });

    return {
      heads,
      filters,
      hasFilter: filters.some((item) => {
        return item;
      })
    };
  }
}
