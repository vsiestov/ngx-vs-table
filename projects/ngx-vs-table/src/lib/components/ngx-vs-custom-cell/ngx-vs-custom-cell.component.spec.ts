import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsCustomCellComponent } from './ngx-vs-custom-cell.component';

describe('NgxVsCustomCellComponent', () => {
  let component: NgxVsCustomCellComponent;
  let fixture: ComponentFixture<NgxVsCustomCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxVsCustomCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsCustomCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
