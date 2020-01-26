import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'property'
})
export class PropertyPipe implements PipeTransform {
  transform(value: any, fn: (value) => any): any {
    if (fn && typeof fn === 'function') {
      return fn(value);
    }

    return null;
  }
}
