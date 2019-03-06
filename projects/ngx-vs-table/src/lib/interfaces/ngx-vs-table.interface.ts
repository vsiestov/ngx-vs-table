import { ComponentRef } from '@angular/core';

export interface ITableHeadCell {
  key: string;
  title: string;
  sortable: boolean;
  sortFunction: (...args) => any;
  direction?: string;
  property?: (...args) => any;
  sticky?: boolean;
  stickyColumn?: boolean;
  component?: ComponentRef<any>;
}

export interface IPagination {
  perPage: number;
  visible: boolean;
}

export interface ITitleValue {
  value: any;
  title: string;
}

export interface IFilterSettings {
  type: string;
  list?: ITitleValue[];
  placeholder?: string;
  filterFunction?: (row: any, value: string) => any;
}

export interface IColumns {
  [propName: string]: {
    title: string;
    sortable?: boolean;
    sortFunction?: (...args) => any;
    property?: (...args) => any;
    sticky?: boolean;
    component?: any;
    componentOnInit?: (instance: any, row?: any) => void;
    filter?: boolean | IFilterSettings;
  };
}

export interface ITableSettings {
  columns: IColumns;
  trackBy?: string;
  head?: {
    sticky: boolean;
  };
  pagination?: IPagination;
  rowClassFunction?: (row: any) => string;
}
