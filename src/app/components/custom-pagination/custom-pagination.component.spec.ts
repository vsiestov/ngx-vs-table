import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPaginationComponent } from './custom-pagination.component';

describe('CustomPaginationComponent', () => {
  let component: CustomPaginationComponent;
  let fixture: ComponentFixture<CustomPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.count = 100;
    component.active = 0;
    component.settings = {
      perPage: 20,
      position: 'bottom',
      visible: true
    };

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
