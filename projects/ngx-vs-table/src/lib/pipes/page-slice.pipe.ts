import { Pipe, PipeTransform } from '@angular/core';
import { slice } from 'lodash-es';

@Pipe({
  name: 'pageSlice'
})
export class PageSlicePipe implements PipeTransform {
  size = 5;

  transform(value: any[], current: number, count: number): any {
    if (value instanceof Array) {

      if (value.length > this.size) {
        const result = this.size + current;
        const bool = result < count;
        const finalCount = bool ? result : count;
        const finalOffset = bool ? current : current - result;

        return slice(value, finalOffset, finalCount);
      }

      return value;
    }

    return [];
  }

}
