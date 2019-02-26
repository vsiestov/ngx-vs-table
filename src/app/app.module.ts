import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { NgxVsModuleModule } from '../../projects/ngx-vs-table/src/lib/ngx-vs-table.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomCellComponent
  ],
  imports: [
    BrowserModule,
    NgxVsModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomCellComponent
  ]
})
export class AppModule { }
