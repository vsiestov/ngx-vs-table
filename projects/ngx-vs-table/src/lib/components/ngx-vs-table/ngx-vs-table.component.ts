import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { IColumns, IFilterSettings, ITableHeadCell, ITableSettings } from '../../interfaces/ngx-vs-table.interface';
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
  private matchMediaChanged: boolean;

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
  isResponsiveMatch: boolean;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
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
    this.matchMediaListener = this.matchMediaListener.bind(this);
  }

  private matchMediaListener() {
    this.matchMediaChanged = true;

    this.updateData(this.data);
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

      const responsive = columns[item].responsive;
      const responsiveCount = responsive ? responsive.length : 0;
      const medias = [];

      for (let i = 0; i < responsiveCount; i++) {
        if (medias.indexOf(responsive[i].media) === -1) {
          medias.push(responsive[i].media);
        }
      }

      medias.forEach((media) => {
        media.addListener(this.matchMediaListener);
      });

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

  private getColumnCount(columns: IColumns, keys) {
    const keysCount = keys.length;
    let columnsCount = 0;

    this.isResponsiveMatch = false;

    for (let i = 0; i < keysCount; i++) {
      const responsive = columns[keys[i]].responsive;
      const responsiveCount = responsive ? responsive.length : 0;

      if (!responsive || !responsive.length) {
        columnsCount++;

        continue;
      }

      for (let j = 0; j < responsiveCount; j++) {
        if (responsive[j].media.matches) {

          this.isResponsiveMatch = true;

          if (responsive[j].column > columnsCount) {
            columnsCount = responsive[j].column + 1;
          }
        }
      }
    }

    return columnsCount;
  }

  private transformData(columns: IColumns, keys, data) {
    const keysCount = keys.length;
    const columnsCount = this.getColumnCount(columns, keys);

    this.matchMediaChanged = false;

    return data.map((row) => {
      const result: {
        source?: any;
        length: number;
        [index: number]: any[]
      } = new Array(columnsCount);

      let index = 0;

      for (let i = 0; i < keysCount; i++) {
        let value;
        let cell;

        if (!result[index]) {
          result[index] = [];
        }

        if (columns[keys[i]].component) {
          cell = {
            component: columns[keys[i]].component,
            componentOnInit: columns[keys[i]].componentOnInit,
            componentFactoryResolver: columns[keys[i]].componentFactoryResolver,
            value: row
          };
        } else {
          try {
            value = columns[keys[i]].property && typeof columns[keys[i]].property === 'function'
              ? columns[keys[i]].property(row)
              : row[keys[i]];
          } catch {
            value = '';
          }

          cell = {
            value,
            ...columns[keys[i]].hasOwnProperty('sticky') ? {sticky: columns[keys[i]].sticky} : {}
          };
        }

        const responsive = columns[keys[i]].responsive;
        const responsiveCount = responsive ? responsive.length : 0;

        if (responsive && responsiveCount) {
          for (let j = 0; j < responsiveCount; j++) {
            if (responsive[j].media.matches) {
              result[responsive[j].column].push({
                ...cell,
                label: responsive[j].label && typeof responsive[j].label === 'boolean'
                  ? columns[keys[i]].title
                  : responsive[j].label
              });
            } else {
              result[index].push(cell);
            }
          }
        } else {
          result[index].push(cell);
        }

        index++;
      }

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

      if (!this.matchMediaChanged && sortedData === this.cachedData) {
        return;
      }

      this.cachedData = sortedData;

      this.rows = this.transformData(columns, keys, data);

      this.cdr.markForCheck();

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

    this.cdr.markForCheck();
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
          const cell = o[property.index] ? o[property.index][0].value : null;

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
