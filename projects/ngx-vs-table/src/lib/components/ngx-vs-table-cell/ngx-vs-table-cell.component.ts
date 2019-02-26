import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-vs-table-cell',
  templateUrl: './ngx-vs-table-cell.component.html',
  styleUrls: ['./ngx-vs-table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxVsTableCellComponent {
  @Input() value: any;
}
