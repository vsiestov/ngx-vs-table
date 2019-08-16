import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterHandlerComponent } from './custom-filter-handler.component';

describe('CustomFilterHandlerComponent', () => {
  let component: CustomFilterHandlerComponent;
  let fixture: ComponentFixture<CustomFilterHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFilterHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
