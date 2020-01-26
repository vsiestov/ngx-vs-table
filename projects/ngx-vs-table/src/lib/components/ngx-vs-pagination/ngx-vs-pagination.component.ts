import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { IPagination } from '../../interfaces/ngx-vs-table.interface';

@Component({
  selector: 'ngx-vs-pagination',
  templateUrl: './ngx-vs-pagination.component.html',
  styleUrls: ['./ngx-vs-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxVsPaginationComponent {
  @Input() settings: IPagination;
  @Input() count = 0;
  @Input() activePage: number;
  @Output() changed: EventEmitter<number> = new EventEmitter();

  onFirst() {
    this.changed.emit(0);
  }

  onLast(pages) {
    this.changed.emit(pages.length - 1);
  }

  onPrev() {
    if (this.activePage > 0) {
      this.changed.emit(this.activePage - 1);
    }
  }

  onNext(pages) {
    if (pages.length - 1 > this.activePage) {
      this.changed.emit(this.activePage + 1);
    }
  }

  onChoose(page: number) {
    this.changed.emit(page);
  }

}
