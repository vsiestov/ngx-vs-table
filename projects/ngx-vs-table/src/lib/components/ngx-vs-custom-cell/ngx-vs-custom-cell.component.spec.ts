import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsCustomCellComponent } from './ngx-vs-custom-cell.component';
import { ChangeDetectorRef, Component, NgModule, SimpleChange } from '@angular/core';

describe('NgxVsCustomCellComponent', () => {
  let component: NgxVsCustomCellComponent;
  let fixture: ComponentFixture<NgxVsCustomCellComponent>;

  @Component({
    template: `
      <h1>Temp component</h1>
    `
  })
  class TempComponent {
    constructor(public cdr: ChangeDetectorRef) {
    }
  }

  @NgModule({
    declarations: [
      TempComponent
    ],
    exports: [TempComponent],
    entryComponents: [TempComponent]
  })
  class TempModule {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TempModule],
      declarations: [
        NgxVsCustomCellComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsCustomCellComponent);
    component = fixture.componentInstance;
  });

  describe('No component', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should ignore initialization', () => {
      expect(component.componentRef).toBeFalsy();
    });
  });

  describe('With component', () => {

    beforeEach(() => {
      component.component = TempComponent;
      component.value = 'Custom Cell';
    });

    describe('With default value', () => {

      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should set value', () => {
        expect(component.componentRef.instance.value).toEqual(component.value);
      });

      it('should propagate changes', () => {
        const spyOnDetect = spyOn(component.componentRef.instance.cdr, 'markForCheck');

        component.value = 'Hello';
        component.ngOnChanges({
          value: new SimpleChange(null, 'Hello', true)
        });

        expect(component.componentRef.instance.value).toEqual('Hello');
        expect(spyOnDetect).toHaveBeenCalled();
      });
    });

    describe('With manual provided value', () => {
      let spyOnInit: jasmine.Spy;
      let spyOnUpdate: jasmine.Spy;

      beforeEach(() => {
        component.init = () => {

        };
        component.update = () => {

        };
        spyOnInit = spyOn(component, 'init');
        spyOnUpdate = spyOn(component, 'update');
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(spyOnInit).toHaveBeenCalledWith(component.componentRef.instance, 'Custom Cell');
        expect(spyOnUpdate).toHaveBeenCalledWith(component.componentRef.instance, 'Custom Cell');
      });

      it('should propagate changes', () => {
        component.value = 'Hello';
        component.ngOnChanges({
          value: new SimpleChange(null, 'Hello', true)
        });

        expect(spyOnUpdate).toHaveBeenCalledWith(component.componentRef.instance, 'Hello');
      });
    });
  });
});
