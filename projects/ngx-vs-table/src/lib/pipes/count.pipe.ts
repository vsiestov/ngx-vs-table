import { Pipe, PipeTransform } from '@angular/core';
import { size } from 'lodash-es';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {
  transform(value: any): number {
    return size(value);
  }
}
