import { ComponentFactoryResolver, ComponentRef } from '@angular/core';

export interface ITableHeadCell {
  key: string;
  title: string | {
    component?: any;
    componentOnInit?: (instance: any, row?: any) => void;
    componentFactoryResolver?: ComponentFactoryResolver;
  };
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
  position?: 'top' | 'bottom' | 'both';
}

export interface ITitleValue {
  value: any;
  title: string;
}

export interface IFilterSettings {
  type: string | {
    component?: any;
    componentOnInit?: (instance: any, row?: any) => void;
    componentFactoryResolver?: ComponentFactoryResolver;
  };
  list?: ITitleValue[];
  placeholder?: string;
  filterFunction?: (row: any, value: any) => any;
  component?: any;
  componentOnInit?: (instance: any, row?: any) => void;
}

export interface IResponsiveSetting {
  media: MediaQueryList;
  column: number;
  order?: number;
  label?: string | boolean;
}

export interface IColumns {
  [propName: string]: {
    title: string | {
      component?: any;
      componentOnInit?: (instance: any, row?: any) => void;
      componentFactoryResolver?: ComponentFactoryResolver;
    };
    sortable?: boolean;
    sortFunction?: (...args) => any;
    property?: (...args) => any;
    sticky?: boolean;
    component?: any;
    componentOnInit?: (instance: any, row?: any) => void;
    componentFactoryResolver?: ComponentFactoryResolver;
    filter?: boolean | IFilterSettings;
    responsive?: IResponsiveSetting[]
  };
}

export interface ITableSettings {
  columns: IColumns;
  trackBy?: string;
  head?: {
    sticky?: boolean;
    invisible?: boolean;
  };
  pagination?: IPagination;
  componentTemplate?: {
    custom: boolean
  };
  rowClassFunction?: (row: any) => string;
  mode?: 'view' | 'none';
}
