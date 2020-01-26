import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowMenuComponent } from './row-menu.component';

describe('RowMenuComponent', () => {
  let component: RowMenuComponent;
  let fixture: ComponentFixture<RowMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
