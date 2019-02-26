import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { NgxVsTableModule } from '../../projects/ngx-vs-table/src/lib/ngx-vs-table.module';
// import { NgxVsModuleModule } from '../../dist/ngx-vs-table';

@NgModule({
  declarations: [
    AppComponent,
    CustomCellComponent
  ],
  imports: [
    BrowserModule,
    NgxVsTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomCellComponent
  ]
})
export class AppModule { }
