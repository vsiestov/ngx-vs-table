import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IColumns, IHeadKey } from '../../interfaces/ngx-vs-table.interface';

@Component({
  selector: 'td[ngx-vs-table-cell]',
  templateUrl: './ngx-vs-table-cell.component.html',
  styleUrls: ['./ngx-vs-table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxVsTableCellComponent {
  @Input() columns: IColumns;
  @Input() keys: IHeadKey[];
  @Input() source: any;

  trackByKeys(index, key: IHeadKey) {
    if (key && key.value) {
      return key.value;
    }

    return index;
  }
}
