import { Pipe, PipeTransform } from '@angular/core';
import { IPagination } from '../interfaces/ngx-vs-table.interface';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  transform(value: any[], pagination: IPagination, active: number): any {
    if (!Array.isArray(value)) {
      return [];
    }

    if (!pagination) {
      return value;
    }

    const offset = active * pagination.perPage;

    return pagination.visible
      ? value.slice(offset, pagination.perPage + offset)
      : value;
  }
}
