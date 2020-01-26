import { Pipe, PipeTransform } from '@angular/core';
import { IColumns, IHeadKey } from '../interfaces/ngx-vs-table.interface';

@Pipe({
  name: 'responsive'
})
export class ResponsivePipe implements PipeTransform {
  transform(columns: IColumns): IHeadKey[][] {
    const keys = Object.keys(columns);
    const keysCount = keys.length;
    const responsiveColumns = [];
    let columnsCount = 0;

    for (let i = 0; i < keysCount; i++) {
      const { responsive, ...column } = columns[keys[i]];
      const responsiveCount = responsive ? responsive.length : 0;

      if (!responsiveColumns[columnsCount]) {
        responsiveColumns[columnsCount] = [];
      }

      if (!responsive || !responsive.length) {
        responsiveColumns[columnsCount].push({
          ...column,
          value: keys[i]
        });
        columnsCount++;

        continue;
      }

      for (let j = 0; j < responsiveCount; j++) {
        if (responsive[j].media.matches) {
          if (!responsiveColumns[responsive[j].column]) {
            responsiveColumns[responsive[j].column] = [];
          }

          responsiveColumns[responsive[j].column].push({
            ...column,
            value: keys[i],
            title: responsive[j].label
              ? typeof responsive[j].label === 'boolean'
                ? column.title
                : responsive[j].label
              : ''
          });

          if (responsive[j].column > columnsCount) {
            columnsCount = responsive[j].column + 1;
          }
        } else {
          responsiveColumns[columnsCount].push({
            ...column,
            value: keys[i]
          });
          columnsCount++;
        }
      }
    }

    return responsiveColumns;
  }
}
