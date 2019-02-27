import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { NgxVsTableModule } from '../../dist/ngx-vs-table';
import { MainComponent } from './components/main/main.component';
import { AppRouterModule } from './app-router.module';
import { NestedComponent } from './components/nested/nested.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { RecursiveComponent } from './components/recursive/recursive.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCellComponent,
    MainComponent,
    NestedComponent,
    ExpandableComponent,
    RecursiveComponent
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
