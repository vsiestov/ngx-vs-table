import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsTableCellComponent } from './ngx-vs-table-cell.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PropertyPipe } from '../../pipes/property.pipe';

describe('NgxVsTableCellComponent', () => {
  let component: NgxVsTableCellComponent;
  let fixture: ComponentFixture<NgxVsTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxVsTableCellComponent,
        PropertyPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
