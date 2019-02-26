import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsPaginationComponent } from './ngx-vs-pagination.component';
import { SimpleChange } from '@angular/core';
import { PageSlicePipe } from '../../pipes/page-slice.pipe';

describe('NgxVsPaginationComponent', () => {
  let component: NgxVsPaginationComponent;
  let fixture: ComponentFixture<NgxVsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxVsPaginationComponent,
        PageSlicePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsPaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render pagination', () => {
    const rows = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      rows.push(i);
    }

    component.count = count;
    component.settings = {
      visible: true,
      perPage: 20
    };

    component.ngOnChanges({
      count: new SimpleChange(null, count, true),
      settings: new SimpleChange(null, component.settings, true)
    });

    fixture.detectChanges();

    expect(component.active).toEqual(0);
    expect(component.pages.length).toEqual(5);
    expect(fixture.nativeElement.querySelectorAll('.ngx-vs-pagination__item').length).toEqual(9);

    fixture.nativeElement.querySelector('.ngx-vs-pagination__item:last-child .ngx-vs-pagination__button').dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.active).toEqual(4);
    expect(fixture.nativeElement.querySelector('.ngx-vs-pagination__item.active').textContent).toContain('5');
    expect(fixture.nativeElement.querySelectorAll('.ngx-vs-pagination__item').length).toEqual(9);
  });
});
