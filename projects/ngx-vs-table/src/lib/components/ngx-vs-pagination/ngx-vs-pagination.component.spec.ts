import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsPaginationComponent } from './ngx-vs-pagination.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { PageSlicePipe } from '../../pipes/page-slice.pipe';
import { PagesPipe } from '../../pipes/pages.pipe';

describe('NgxVsPaginationComponent', () => {
  let component: NgxVsPaginationComponent;
  let fixture: ComponentFixture<NgxVsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxVsPaginationComponent,
        PageSlicePipe,
        PagesPipe
      ]
    })
      .overrideComponent(NgxVsPaginationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  }));

  let spyOnChanged: jasmine.Spy;

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsPaginationComponent);
    component = fixture.componentInstance;
    spyOnChanged = spyOn(component.changed, 'emit');
  });

  it('should render pagination', () => {
    const rows = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      rows.push(i);
    }

    component.count = count;
    component.activePage = 0;
    component.settings = {
      visible: true,
      perPage: 20
    };

    fixture.detectChanges();

    expect(component.activePage).toEqual(0);
    expect(fixture.nativeElement.querySelectorAll('.ngx-vs-pagination__item').length).toEqual(9);

    component.activePage = 4;

    fixture.detectChanges();

    expect(component.activePage).toEqual(4);
    expect(fixture.nativeElement.querySelector('.ngx-vs-pagination__item.active').textContent).toContain('5');
    expect(fixture.nativeElement.querySelectorAll('.ngx-vs-pagination__item').length).toEqual(9);
  });

  it('should check emitters', () => {
    component.onFirst();
    expect(spyOnChanged).toHaveBeenCalledWith(0);

    component.onLast([1, 2, 3]);
    expect(spyOnChanged).toHaveBeenCalledWith(2);

    component.onChoose(3);
    expect(spyOnChanged).toHaveBeenCalledWith(3);

    component.activePage = 0;
    component.onPrev();
    expect(spyOnChanged).not.toHaveBeenCalledWith(-1);

    component.activePage = 2;
    component.onPrev();
    expect(spyOnChanged).toHaveBeenCalledWith(1);

    component.activePage = 4;
    component.onNext([1, 2, 3, 4, 5]);
    expect(spyOnChanged).not.toHaveBeenCalledWith(5);

    component.activePage = 4;
    component.onNext([1, 2, 3, 4, 5, 6]);
    expect(spyOnChanged).toHaveBeenCalledWith(5);
  });
});
