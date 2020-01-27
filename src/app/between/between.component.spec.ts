import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenComponent } from './between.component';

describe('BetweenComponent', () => {
  let component: BetweenComponent;
  let fixture: ComponentFixture<BetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetweenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
