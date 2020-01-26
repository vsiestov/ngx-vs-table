import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVsTableCellComponent } from './components/ngx-vs-table-cell/ngx-vs-table-cell.component';
import { NgxVsTableComponent } from './components/ngx-vs-table/ngx-vs-table.component';
import { NgxVsCustomCellComponent } from './components/ngx-vs-custom-cell/ngx-vs-custom-cell.component';
import { NgxVsPaginationComponent } from './components/ngx-vs-pagination/ngx-vs-pagination.component';
import { PageSlicePipe } from './pipes/page-slice.pipe';
import { HeadsPipe } from './pipes/heads.pipe';
import { NgxVsRowComponent } from './components/ngx-vs-row/ngx-vs-row.component';
import { PropertyPipe } from './pipes/property.pipe';
import { RowClassPipe } from './pipes/row-class.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { PagesPipe } from './pipes/pages.pipe';
import { ResponsivePipe } from './pipes/responsive.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxVsTableComponent,
    NgxVsTableCellComponent,
    NgxVsCustomCellComponent,
    NgxVsPaginationComponent,
    PageSlicePipe,
    HeadsPipe,
    NgxVsRowComponent,
    PropertyPipe,
    RowClassPipe,
    FilterPipe,
    SortPipe,
    PaginationPipe,
    PagesPipe,
    ResponsivePipe
  ],
  exports: [
    NgxVsTableComponent,
    PageSlicePipe,
    NgxVsPaginationComponent,
    HeadsPipe,
    PaginationPipe,
    PropertyPipe,
    PagesPipe
  ]
})
export class NgxVsTableModule {

}
