import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { MainComponent } from './components/main/main.component';
import { AppRouterModule } from './app-router.module';
import { NestedComponent } from './components/nested/nested.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { RecursiveComponent } from './components/recursive/recursive.component';
import { NgxVsTableModule } from '../../projects/ngx-vs-table/src/lib/ngx-vs-table.module';
// import { NgxVsTableModule } from '../../dist/ngx-vs-table';
import { FiltersComponent } from './components/filters/filters.component';
import { CustomFilterComponent } from './components/custom-filter/custom-filter.component';
import { CustomFilterHandlerComponent } from './components/custom-filter-handler/custom-filter-handler.component';
import { CustomPaginationComponent } from './components/custom-pagination/custom-pagination.component';
import { CheckboxCellComponent } from './components/checkbox-cell/checkbox-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCellComponent,
    MainComponent,
    NestedComponent,
    ExpandableComponent,
    RecursiveComponent,
    FiltersComponent,
    CustomFilterComponent,
    CustomFilterHandlerComponent,
    CustomPaginationComponent,
    CheckboxCellComponent
  ],
  imports: [
    BrowserModule,
    NgxVsTableModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomCellComponent,
    CustomFilterComponent,
    CustomFilterHandlerComponent,
    CheckboxCellComponent
  ]
})
export class AppModule { }
