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
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCellComponent,
    MainComponent,
    NestedComponent,
    ExpandableComponent,
    RecursiveComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    NgxVsTableModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomCellComponent
  ]
})
export class AppModule { }
