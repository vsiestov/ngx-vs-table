import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IPagination } from '../../interfaces/ngx-vs-table.interface';

@Component({
  selector: 'ngx-vs-pagination',
  templateUrl: './ngx-vs-pagination.component.html',
  styleUrls: ['./ngx-vs-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxVsPaginationComponent implements OnChanges {
  @Input() settings: IPagination;
  @Input() count: number;
  @Input('activePage') active: number;

  @Output() changed: EventEmitter<number>;
  pages: number[];

  private readonly defaultSettings: IPagination;

  constructor() {
    this.pages = [];
    this.defaultSettings = {
      visible: false,
      perPage: 20
    };
    this.count = 0;

    this.changed = new EventEmitter();
    this.settings = this.defaultSettings;
  }

  private updateSettings() {
    this.settings = {
      ...this.defaultSettings,
      ...this.settings
    };
  }

  private updatePages() {
    const settings = this.settings ? this.settings : this.defaultSettings;
    const count = this.count;
    const pagesCount = Math.ceil(count / settings.perPage);

    this.pages = [];

    for (let i = 0; i < pagesCount; i++) {
      this.pages.push(i);
    }

    this.active = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.count) {
      this.updatePages();
    }

    if (changes.settings) {
      this.updateSettings();
    }
  }

  onFirst() {
    this.active = 0;
    this.changed.emit(this.active);
  }

  onPrev() {
    this.active--;
    this.changed.emit(this.active);
  }

  onChoose(page: number) {
    this.active = page;
    this.changed.emit(this.active);
  }

  onNext() {
    this.active++;
    this.changed.emit(this.active);
  }

  onLast() {
    this.active = this.pages.length - 1;
    this.changed.emit(this.active);
  }

}
