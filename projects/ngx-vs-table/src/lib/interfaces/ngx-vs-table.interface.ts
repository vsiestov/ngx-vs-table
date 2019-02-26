import { ComponentRef } from '@angular/core';

export interface ITableHeadCell {
  key: string;
  title: string;
  sortable: boolean;
  direction?: string;
  property?: () => void;
  sticky?: boolean;
  stickyColumn?: boolean;
  component?: ComponentRef<any>;
}

export interface IPagination {
  perPage: number;
  visible: boolean;
}

export interface ITableSettings {
  columns: any;
  trackBy?: string;
  head?: {
    sticky: boolean;
  };
  pagination?: IPagination;
}
