import { Pipe, PipeTransform } from '@angular/core';
import { FilterTypeControl, IFilterConfig, TTableMode } from '../interfaces/ngx-vs-table.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filter: IFilterConfig, mode?: TTableMode): any[] {
    if (!Array.isArray(value)) {
      return [];
    }

    if (mode === TTableMode.view) {
      return value;
    }

    return value.filter((o) => {
      let result = true;

      for (const item in filter) {
        if (filter.hasOwnProperty(item)) {
          const property = filter[item];
          const cell = o[item];

          if ((cell === null || cell === undefined) && !property.filterFunction) {
            continue;
          }

          if (property.filterFunction && typeof property.filterFunction === 'function') {
            result = property.filterFunction(o, property.value);
          } else {
            switch (property.type) {
              case FilterTypeControl.number:
              case FilterTypeControl.checkbox:
                result = cell === property.value;
                break;

              case FilterTypeControl.select:
                if (property.value !== '-1') {
                  result = cell === property.value;
                }
                break;

              default:
                result = (typeof cell === 'string' ? cell : cell.toString())
                  .toLowerCase()
                  .indexOf(
                    (typeof property.value === 'string'
                      ? property.value
                      : property.value.toString()
                    ).toLowerCase()) !== -1;
            }
          }

          if (!result) {
            return false;
          }
        }
      }

      return true;
    });
  }
}
