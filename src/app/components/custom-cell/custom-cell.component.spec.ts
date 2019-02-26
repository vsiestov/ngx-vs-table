import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCellComponent } from './custom-cell.component';

describe('CustomCellComponent', () => {
  let component: CustomCellComponent;
  let fixture: ComponentFixture<CustomCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
