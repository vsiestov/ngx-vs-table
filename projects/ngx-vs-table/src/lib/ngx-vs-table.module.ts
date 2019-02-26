import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVsTableCellComponent } from './components/ngx-vs-table-cell/ngx-vs-table-cell.component';
import { NgxVsTableComponent } from './components/ngx-vs-table/ngx-vs-table.component';
import { NgxVsCustomCellComponent } from './components/ngx-vs-custom-cell/ngx-vs-custom-cell.component';
import { NgxVsPaginationComponent } from './components/ngx-vs-pagination/ngx-vs-pagination.component';
import { PageSlicePipe } from './pipes/page-slice.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxVsTableComponent,
    NgxVsTableCellComponent,
    NgxVsCustomCellComponent,
    NgxVsPaginationComponent,
    PageSlicePipe
  ],
  exports: [
    NgxVsTableComponent
  ]
})
export class NgxVsModuleModule {

}
