import { Pipe, PipeTransform } from '@angular/core';
import { IPagination, PaginationPosition } from '../interfaces/ngx-vs-table.interface';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {
  defaultSettings: IPagination = {
    visible: false,
    perPage: 20,
    position: PaginationPosition.bottom
  };

  transform(value: IPagination, count: number = 5): any {
    const settings = value ? value : this.defaultSettings;
    const pages = [];

    if (!settings.perPage || settings.perPage < 1) {
      return pages;
    }

    const pagesCount = Math.ceil(count / settings.perPage);

    for (let i = 0; i < pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }
}
