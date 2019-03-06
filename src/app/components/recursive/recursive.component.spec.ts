import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveComponent } from './recursive.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecursiveComponent', () => {
  let component: RecursiveComponent;
  let fixture: ComponentFixture<RecursiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursiveComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
