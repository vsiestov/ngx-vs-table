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
import { BetweenComponent } from './components/between/between.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiComponent } from './components/api/api.component';
import { HttpClientModule } from '@angular/common/http';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { DemoComponent } from './components/demo/demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DocumentationComponent } from './components/documenation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToggleComponent,
    RowMenuComponent,
    PersonComponent,
    CheckboxCellComponent,
    BetweenComponent,
    ApiComponent,
    ResponsiveComponent,
    DemoComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    NgxVsTableModule,
    AppRouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ToggleComponent,
    RowMenuComponent,
    PersonComponent,
    CheckboxCellComponent,
    BetweenComponent
  ]
})
export class AppModule { }
