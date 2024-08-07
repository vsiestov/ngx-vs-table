import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef, ViewEncapsulation
} from '@angular/core';
import {
  FilterTypeControl,
  IFilterConfig, IHeadKey,
  ISortConfig,
  ITableFilter,
  ITableHeadCell,
  ITableSettings,
  PaginationPosition,
  SortDirection
} from '../../interfaces/ngx-vs-table.interface';

@Component({
  selector: 'ngx-vs-table',
  templateUrl: './ngx-vs-table.component.html',
  styleUrls: ['./ngx-vs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxVsTableComponent {
  @Input() data: any[];
  @Input() settings: ITableSettings;
  @Input() extendedBody: TemplateRef<any>;
  @Input() className: string;
  @Input() paginationTemplate: TemplateRef<any>;
  @Input() activePage = 0;
  @Input() emptyTemplate: TemplateRef<any>;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() filter: EventEmitter<IFilterConfig> = new EventEmitter();
  @Output() sort: EventEmitter<ISortConfig> = new EventEmitter();

  paginationPosition: typeof PaginationPosition = PaginationPosition;
  filterTypeControl: typeof FilterTypeControl = FilterTypeControl;
  sortDirection: typeof SortDirection = SortDirection;

  sortConfig: ISortConfig;
  filterConfig: IFilterConfig = {};

  constructor() {
    this.onUpdateFilter = this.onUpdateFilter.bind(this);
    this.identify = this.identify.bind(this);
  }

  trackByKey(index, headCell: any) {
    if (headCell) {
      return headCell.key;
    }

    return index;
  }

  trackByKeyListValues(index: number, keyList: IHeadKey[]) {
    if (keyList && keyList.length) {
      return keyList.reduce((acc, item) => acc + item.value, '');
    }

    return index;
  }

  trackByKeyValue(index: number, key: IHeadKey) {
    if (key && key.value) {
      return key.value;
    }

    return index;
  }

  onPageChange(page: number) {
    this.activePage = page;

    this.pageChanged.emit(page);
  }

  identify(index, item) {
    if (this.settings && this.settings.trackBy) {
      return item[this.settings.trackBy];
    }

    return index;
  }

  onUpdateFilter(filter: ITableFilter, index: number, event: EventTarget) {
    let result;
    const value = (event as HTMLInputElement).value;

    switch (filter.type) {
      case FilterTypeControl.number:
        result = parseFloat(value);

        if (!Number.isNaN(result)) {
          this.filterConfig = {
            ...this.filterConfig,
            [filter.key]: {
              index,
              type: filter.type,
              value: result,
              filterFunction: filter.filterFunction
            }
          };
        } else {
          this.clearFilterProperty(filter);
        }

        break;

      case FilterTypeControl.select:
        if (value) {
          this.filterConfig = {
            ...this.filterConfig,
            [filter.key]: {
              index,
              type: filter.type,
              value,
              filterFunction: filter.filterFunction
            }
          };
        } else {
          this.clearFilterProperty(filter);
        }
        break;

      case FilterTypeControl.checkbox:

        if (typeof value === 'boolean') {
          this.filterConfig = {
            ...this.filterConfig,
            [filter.key]: {
              index,
              type: filter.type,
              value,
              filterFunction: filter.filterFunction
            }
          };
        } else {
          this.clearFilterProperty(filter);
        }
        break;

      default:
        result = typeof value === 'string' ? value.trim() : value;

        if (result) {
          this.filterConfig = {
            ...this.filterConfig,
            [filter.key]: {
              index,
              type: filter.type,
              value: result,
              filterFunction: filter.filterFunction
            }
          };
        } else {
          this.clearFilterProperty(filter);
        }
    }

    this.filter.emit(this.filterConfig);

    this.onPageChange(0);
  }

  onCheckBoxChange(filter, i: number, event: Event) {
    event.preventDefault();

    const target = event.target as HTMLInputElement;

    if (this.filterConfig[filter.key] && typeof this.filterConfig[filter.key].value === 'boolean') {
      if (!this.filterConfig[filter.key].value && target.checked) {
        target.indeterminate = true;
      }
    } else {
      target.checked = true;
    }

    this.onUpdateFilter(filter, i, {value: target.indeterminate ? null : target.checked} as unknown as EventTarget);
  }

  onSort(cell: ITableHeadCell) {
    if (!cell.sortable) {
      return;
    }

    const direction = cell.direction
      ? cell.direction === SortDirection.desc
        ? SortDirection.asc
        : SortDirection.desc
      : SortDirection.asc;

    this.sortConfig = {
      key: cell.key,
      direction,
      property: cell.property,
      sortFunction: cell.sortFunction
    };

    this.sort.emit(this.sortConfig);
  }

  clearFilterProperty(prop: ITableFilter) {
    delete this.filterConfig[prop.key];

    this.filterConfig = {
      ...this.filterConfig
    };

    if (prop.filterFunction && typeof prop.filterFunction === 'function') {
      prop.filterFunction(null, null);
    }
  }
}
