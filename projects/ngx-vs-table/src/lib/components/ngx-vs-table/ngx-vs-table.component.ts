import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ITableHeadCell, ITableSettings } from '../../interfaces/ngx-vs-table.interface';
import { omit, orderBy } from 'lodash-es';

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
  @Output() pageChanged: EventEmitter<number>;

  private activePage: number;
  private defaultSettings: ITableSettings;
  private sortConfig: {
    key: string;
    direction: string;
    property?: () => void
  };

  heads: ITableHeadCell[];
  rows: any[][];
  keys: string[];

  constructor() {
    this.pageChanged = new EventEmitter();
    this.className = '';
    this.heads = [];
    this.rows = [];
    this.activePage = 0;
    this.defaultSettings = {
      columns: {
      },
      head: {
        sticky: false
      },
      pagination: {
        visible: false,
        perPage: 20
      }
    };
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

    this.heads = keys.map((item) => {
      return {
        key: item,
        title: columns[item].title,
        sortable: columns[item].hasOwnProperty('sortable')
          ? columns[item].sortable
          : true,
        property: columns[item].property,
        sticky: stickyHead,
        stickyColumn: columns[item].hasOwnProperty('sticky') ? columns[item].sticky : false
      };
    });

    if (this.data) {
      this.updateData(this.data);
    }
  }

  private updateData(data) {
    if (!data) {
      return;
    }

    if (!data.length) {
      this.rows = [];

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

    const pagination = settings.pagination;
    const offset = this.activePage * pagination.perPage;
    const sortedData = this.sortConfig && this.sortConfig.key
      ? this.sortByKey(this.sortConfig.key, this.sortConfig.direction, this.sortConfig.property)
      : data;

    const list = pagination.visible
      ? sortedData.slice(offset, pagination.perPage + offset)
      : sortedData;

    this.rows = list.map((row) => {
      const result: any = keys.map((item) => {
        let value;

        if (columns[item].component) {
          return {
            component: columns[item].component,
            componentOnInit: columns[item].componentOnInit,
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

    return orderBy(this.data, func ? func : [key], direction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.settings) {
      this.updateSettings();
    }

    if (changes.data) {
      this.updateData(changes.data.currentValue);
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
      property: cell.property
    };

    this.updateData(this.data);
  }

  onActiveToggle(row) {
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
  }

  onPageChange(page: number) {
    this.activePage = page;

    if (this.settings.pagination.visible) {
      this.updateData(this.data);
    }

    this.pageChanged.emit(page);
  }

  identify(index, item) {
    if (this.settings && this.settings.trackBy) {
      return item.source[this.settings.trackBy];
    }

    return index;
  }
}
