import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AppRouterModule } from './app-router.module';
import { NgxVsTableModule } from '../../projects/ngx-vs-table/src/lib/ngx-vs-table.module';
import { ToggleComponent } from './components/toggle/toggle.component';
import { RowMenuComponent } from './components/row-menu/row-menu.component';
import { PersonComponent } from './components/person/person.component';
import { CheckboxCellComponent } from './components/checkbox-cell/checkbox-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToggleComponent,
    RowMenuComponent,
    PersonComponent,
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
    ToggleComponent,
    RowMenuComponent,
    PersonComponent,
    CheckboxCellComponent
  ]
})
export class AppModule { }
