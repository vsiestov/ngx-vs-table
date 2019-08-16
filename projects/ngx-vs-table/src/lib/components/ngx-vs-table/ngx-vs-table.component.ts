import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { IFilterSettings, ITableHeadCell, ITableSettings } from '../../interfaces/ngx-vs-table.interface';
import { omit, orderBy } from 'lodash-es';

interface ITableFilter extends IFilterSettings {
  key: string;
  componentFactoryResolver?: ComponentFactoryResolver;
}

@Component({
  selector: 'ngx-vs-table',
  templateUrl: './ngx-vs-table.component.html',
  styleUrls: ['./ngx-vs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxVsTableComponent implements OnChanges {
  @Input() componentTemplate: TemplateRef<any>;
  @Input() data: any[];
  @Input() settings: ITableSettings;
  @Input() additionalRows: TemplateRef<any>;
  @Input() className: string;
  @Input() paginationTemplate: TemplateRef<any>;
  @Input() activePage: number;

  @Output() pageChanged: EventEmitter<number>;
  @Output() toggle: EventEmitter<boolean>;
  @Output() filterTriggered: EventEmitter<any>;

  private cachedData: any[];
  private cachedFilterConfig: any;
  private cachedSortConfig: any;
  private defaultSettings: ITableSettings;
  private sortConfig: {
    key: string;
    direction: string;
    property?: () => void,
    sortFunction?: () => void
  };

  hasFilter: boolean;
  heads: ITableHeadCell[];
  filters: ITableFilter[];
  rows: {
    [position: number]: any;
    source: any;
    length: number;
  }[];
  keys: string[];
  filterConfig: any;
  itemsCount: number;
  responsiveColumnsCount: number;

  constructor() {
    this.pageChanged = new EventEmitter();
    this.toggle = new EventEmitter();
    this.filterTriggered = new EventEmitter();
    this.className = '';
    this.heads = [];
    this.rows = [];
    this.filters = [];
    this.activePage = 0;
    this.filterConfig = {};
    this.defaultSettings = {
      columns: {},
      head: {
        sticky: false,
        invisible: false
      },
      pagination: {
        visible: false,
        perPage: 20,
        position: 'bottom'
      },
      rowClassFunction: () => {
        return '';
      },
      mode: 'none'
    };
    this.onUpdateFilter = this.onUpdateFilter.bind(this);
  }

  private updateSettings() {
    const settings = {
      ...this.defaultSettings,
      ...this.settings
    };

    if (!settings) {
      return;
    }

    const {head, columns} = settings;
    const keys = Object.keys(columns);
    const stickyHead = head && head.hasOwnProperty('sticky') ? head.sticky : false;

    this.keys = keys;
    this.hasFilter = false;
    this.filters = [];
    this.filterConfig = {};
    this.responsiveColumnsCount = 0;

    this.heads = keys.map((item) => {

      if (columns[item].filter) {
        this.hasFilter = true;

        const placeholder = typeof columns[item].title === 'string'
          ? columns[item].title as string
          : '';

        if (typeof columns[item].filter === 'boolean') {
          this.filters.push({
            type: 'text',
            placeholder,
            key: item
          });
        } else if (typeof columns[item].filter === 'object' && columns[item].filter.constructor === Object) {
          this.filters.push({
            ...(columns[item].filter as IFilterSettings),
            key: item,
            placeholder: (columns[item].filter as IFilterSettings).placeholder || placeholder
          });
        }
      } else {
        this.filters.push(null);
      }

      return {
        key: item,
        title: columns[item].title,
        sortable: columns[item].hasOwnProperty('sortable')
          ? columns[item].sortable
          : true,
        property: columns[item].property,
        sortFunction: columns[item].sortFunction,
        sticky: stickyHead,
        stickyColumn: columns[item].hasOwnProperty('sticky') ? columns[item].sticky : false
      };
    });

    this.updateData(this.data);
  }

  private transformData(columns, keys, data) {
    return data.map((row) => {
      const result: any = keys.map((item) => {
        let value;

        if (columns[item].component) {
          return {
            component: columns[item].component,
            componentOnInit: columns[item].componentOnInit,
            componentFactoryResolver: columns[item].componentFactoryResolver,
            value: row
          };
        }

        try {
          value = columns[item].property && typeof columns[item].property === 'function'
            ? columns[item].property(row)
            : row[item];
        } catch {
          value = '';
        }

        return {
          value,
          ...columns[item].hasOwnProperty('sticky') ? {sticky: columns[item].sticky} : {}
        };
      });

      result.source = row;

      return result;
    });
  }

  private sliceData(pagination, offset, data) {
    return pagination.visible
      ? data.slice(offset, pagination.perPage + offset)
      : data;
  }

  private updateData(data) {
    if (!data) {
      return;
    }

    if (!data.length) {
      this.rows = [];
      this.itemsCount = 0;

      if (this.settings.mode === 'view') {

        if (this.filterConfig !== this.cachedFilterConfig || this.sortConfig !== this.cachedSortConfig) {
          this.filterTriggered.emit({
            filter: this.filterConfig,
            sort: this.sortConfig
              ? {
                key: this.sortConfig.key,
                direction: this.sortConfig.direction
              }
              : {}
          });

          this.cachedFilterConfig = this.filterConfig;
          this.cachedSortConfig = this.sortConfig;
        }
      }

      return;
    }

    const keys = this.keys;
    const settings = {
      ...this.defaultSettings,
      ...this.settings
    };
    const columns = settings.columns;

    if (!keys) {
      return;
    }

    const sortedData = this.sortConfig && this.sortConfig.key
      ? this.sortByKey(this.sortConfig.key, this.sortConfig.direction, this.sortConfig.sortFunction || this.sortConfig.property)
      : data;

    if (this.settings.mode === 'view') {
      if (this.filterConfig !== this.cachedFilterConfig || this.sortConfig !== this.cachedSortConfig) {
        this.filterTriggered.emit({
          filter: this.filterConfig,
          sort: this.sortConfig
            ? {
              key: this.sortConfig.key,
              direction: this.sortConfig.direction
            }
            : {}
        });
      }

      this.cachedFilterConfig = this.filterConfig;
      this.cachedSortConfig = this.sortConfig;

      if (sortedData === this.cachedData) {
        return;
      }

      this.cachedData = sortedData;

      this.rows = this.transformData(columns, keys, data);

      return;
    }

    const pagination = settings && settings.pagination
      ? settings.pagination
      : this.defaultSettings.pagination;

    const offset = this.activePage * pagination.perPage;

    if (this.hasFilter) {
      const filteredData = this.filterItems(this.transformData(columns, keys, sortedData), this.filterConfig);
      const list = this.sliceData(pagination, offset, filteredData);

      this.itemsCount = filteredData.length;
      this.rows = list;
    } else {
      const list = this.sliceData(pagination, offset, sortedData);

      this.itemsCount = sortedData.length;
      this.rows = this.transformData(columns, keys, list);
    }

  }

  private sortByKey(key: string, direction: string = 'asc', func: () => void) {
    this.heads = this.heads.map((head) => {
      if (head.key === key) {
        return {
          ...head,
          direction
        };
      }

      return omit(head, 'direction');
    });

    if (this.settings.mode === 'view') {
      return this.data;
    }

    return orderBy(this.data, func ? func : [key], direction);
  }

  private clearFilterProperty(prop: ITableFilter) {
    delete this.filterConfig[prop.key];

    this.filterConfig = {
      ...this.filterConfig
    };

    if (prop.filterFunction && typeof prop.filterFunction === 'function') {
      prop.filterFunction(null, null);
    }
  }

  private filterItems(value: any[], args?: any): any {
    return value.filter((o) => {
      let result = true;

      for (const item in args) {

        if (args.hasOwnProperty(item)) {
          const property = args[item];
          const cell = o[property.index] ? o[property.index].value : null;

          if (cell === null) {
            continue;
          }

          if (property.filterFunction && typeof property.filterFunction === 'function') {
            result = property.filterFunction(o.source, property.value);
          } else {
            switch (property.type) {
              case 'number':
              case 'checkbox':
                result = cell === property.value;
                break;

              case 'select':
                if (property.value !== '-1') {
                  result = cell === property.value;
                }
                break;

              default:
                result = (typeof cell === 'string' ? cell : cell.toString())
                  .toLowerCase()
                  .indexOf(property.value.toLowerCase()) !== -1;
            }
          }

          if (!result) {
            return false;
          }
        }

      }

      return true;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.settings) {
      this.updateSettings();
    }

    if (changes.data) {
      this.updateData(changes.data.currentValue);
    }

    if (changes.activePage) {
      this.onPageChange(changes.activePage.currentValue);
    }
  }

  onSort(cell: ITableHeadCell) {
    if (!cell.sortable) {
      return;
    }

    const direction = cell.direction
      ? cell.direction === 'desc'
        ? 'asc' : 'desc'
      : 'asc';

    this.sortConfig = {
      key: cell.key,
      direction,
      property: cell.property,
      sortFunction: cell.sortFunction
    };

    this.updateData(this.data);
  }

  onActiveToggle(row) {
    if (this.settings.mode === 'view') {
      this.toggle.emit(row);

      return;
    }

    const index = this.rows.indexOf(row);

    if (index === -1) {
      return;
    }

    const result: any = [...row];

    result.source = {
      ...row.source,
      isActive: !row.source.isActive
    };

    this.rows = [...this.rows.slice(0, index), result, ...this.rows.slice(index + 1)];
    this.toggle.emit(result.source);
  }

  onPageChange(page: number) {
    this.activePage = page;
    this.updateData(this.data);
    this.pageChanged.emit(page);
  }

  identify(index, item) {
    if (this.settings && this.settings.trackBy) {
      return item.source[this.settings.trackBy];
    }

    return index;
  }

  rowClassName(row): string {
    return this.settings.rowClassFunction ? this.settings.rowClassFunction(row) : '';
  }

  onUpdateFilter(filter: ITableFilter, index, value) {
    let result;

    switch (filter.type) {
      case 'number':
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

      case 'select':
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

      case 'checkbox':

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

    this.activePage = 0;

    this.updateData(this.data);
  }

  onChangeBoxChange(filter, i, event: Event) {
    event.preventDefault();

    const target = event.target as HTMLInputElement;

    if (this.filterConfig[filter.key] && typeof this.filterConfig[filter.key].value === 'boolean') {
      if (!this.filterConfig[filter.key].value && target.checked) {
        target.indeterminate = true;
      }
    } else {
      target.checked = true;
    }

    this.onUpdateFilter(filter, i, target.indeterminate ? null : target.checked);
  }
}
