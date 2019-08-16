import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IPagination } from '../../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';

@Component({
  selector: 'custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPaginationComponent implements OnChanges {
  @Input() active: number;
  @Input() count: number;
  @Input() settings: IPagination;
  @Input() list: number[];

  @Output() perPageChanged: EventEmitter<number> = new EventEmitter();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  pages: number[];
  offsetStart: number;
  offsetEnd: number;

  constructor() {
    this.pages = [];
  }

  private updateOffsetValues() {
    this.offsetStart = this.active * this.settings.perPage + 1;
    this.offsetEnd = this.settings.perPage + this.active * this.settings.perPage;

    if (this.offsetEnd > this.count) {
      this.offsetEnd = this.count;
    }
  }

  private updatePages() {
    const settings = this.settings;
    const count = this.count;
    const pagesCount = Math.ceil(count / settings.perPage);

    this.pages = [];

    for (let i = 0; i < pagesCount; i++) {
      this.pages.push(i);
    }

    this.active = 0;
    this.updateOffsetValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.count || changes.settings) {
      this.updatePages();
    }

    if (changes.active) {
      this.updateOffsetValues();
    }
  }

  onPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.perPageChanged.emit(parseInt(target.value, 10));

    this.updateOffsetValues();
  }

  onPrev() {
    this.pageChanged.emit(this.active - 1);
  }

  onNext() {
    this.pageChanged.emit(this.active + 1);
  }
}
