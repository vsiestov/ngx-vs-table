import { ComponentFactoryResolver, ComponentRef } from '@angular/core';

export enum PaginationPosition {
  top = 'top',
  bottom = 'bottom',
  both = 'both'
}

export enum FilterTypeControl {
  custom = 'custom',
  checkbox = 'checkbox',
  select = 'select',
  number = 'number',
  text = 'text'
}

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface IComponent<T, V> {
  component?: T;
  componentFactoryResolver?: ComponentFactoryResolver;
  componentOnInit?: (instance: T, row?: V) => void;
  componentOnUpdate?: (instance: T, row?: V) => void;
  componentOnDestroy?: (instance: T, row?: V) => void;
}

export interface ITableHeadCell {
  key: string;
  title: any;
  sortable: boolean;
  sortFunction?: (...args) => any;
  direction?: string;
  property?: (...args) => any;
  sticky?: boolean;
  stickyColumn?: boolean;
  component?: ComponentRef<any>;
}

export interface IPagination {
  perPage: number;
  visible: boolean;
  position?: PaginationPosition;
}

export interface ITitleValue {
  value: any;
  title: string;
}

export interface IFilterSettings extends IComponent<any, any> {
  type: FilterTypeControl | IComponent<any, any>;
  list?: ITitleValue[];
  placeholder?: string;
  filterFunction?: (row: any, value: any) => boolean;
}

export interface ITableFilter extends IFilterSettings {
  key: string;
  componentFactoryResolver?: ComponentFactoryResolver;
}

export interface IResponsiveSetting {
  media: MediaQueryList;
  column: number;
  order?: number;
  label?: string | boolean;
}

export interface IColumn<T, V> extends IComponent<T, V> {
  title: string | IComponent<T, V>;
  sortable?: boolean;
  sortFunction?: (...args) => any;
  property?: (...args) => any;
  sticky?: boolean;
  filter?: boolean | IFilterSettings;
  responsive?: IResponsiveSetting[];
}

export interface IColumns {
  [propName: string]: IColumn<any, any>;
}
export interface ITableHead {
  sticky?: boolean;
  invisible?: boolean;
}

export enum TTableMode {
  view= 'view',
  none = 'none'
}

export interface ITableSettings {
  columns: IColumns;
  trackBy?: string;
  head?: ITableHead;
  pagination?: IPagination;
  rowClassFunction?: (row: any) => string;
  mode?: TTableMode;
}

export interface ISortConfig {
  key: string;
  direction: string;
  property?: (row: any) => any;
  sortFunction?: (row: any) => any;
}

export interface IFilterItem {
  index?: number;
  type: FilterTypeControl | IComponent<any, any>;
  value?: any;
  filterFunction?: (row: any, value: any) => boolean;
}

export interface IFilterConfig {
  [propertyName: string]: IFilterItem;
}

export interface IHeadKey {
  value: string;
  title: string | IComponent<any, any>;
  filter?: boolean | IFilterSettings;
  sortable?: boolean;
  sortFunction?: (...args) => any;
  sticky?: boolean;
  property?: (...args) => any;
}

export interface IHead {
  heads: ITableHeadCell[];
  filters: ITableFilter[];
  hasFilter: boolean;
}

export interface ICustomFilter {
  update: (props: any) => void;
};
