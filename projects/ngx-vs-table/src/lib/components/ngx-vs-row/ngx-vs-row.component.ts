import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { IColumns, IHeadKey, ITableHeadCell } from '../../interfaces/ngx-vs-table.interface';

@Component({
  selector: 'tbody[ngx-vs-row]',
  templateUrl: './ngx-vs-row.component.html',
  styleUrls: ['./ngx-vs-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxVsRowComponent {
  @Input() row: any;
  @Input() columns: IColumns;
  @Input() keysList: IHeadKey[][];
  @Input() index: number;
  @Input() extendedBody: TemplateRef<any>;

  trackByKeys(index, keyList: IHeadKey[]) {
    if (keyList && keyList.length) {
      return keyList.reduce((acc, item) => acc + item.value, '');
    }

    return index;
  }
}
