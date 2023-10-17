import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsTableComponent } from './ngx-vs-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxVsTableCellComponent } from '../ngx-vs-table-cell/ngx-vs-table-cell.component';
import { NgxVsCustomCellComponent } from '../ngx-vs-custom-cell/ngx-vs-custom-cell.component';
import { PageSlicePipe } from '../../pipes/page-slice.pipe';
import { FilterTypeControl, ITableSettings, SortDirection } from '../../interfaces/ngx-vs-table.interface';
import { SortPipe } from '../../pipes/sort.pipe';
import { HeadsPipe } from '../../pipes/heads.pipe';
import { ResponsivePipe } from '../../pipes/responsive.pipe';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { RowClassPipe } from '../../pipes/row-class.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { PropertyPipe } from '../../pipes/property.pipe';
import { CountPipe } from '../../pipes/count.pipe';

describe('NgxVsTableComponent', () => {
  let component: NgxVsTableComponent;
  let fixture: ComponentFixture<NgxVsTableComponent>;

  const simpleSettings: ITableSettings = {
    columns: {
      id: {
        title: 'ID'
      },
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      email: {
        title: 'Email'
      }
    },
    trackBy: 'id'
  };

  const simpleData = [
    {
      id: 0,
      firstName: 'Valeriy',
      lastName: 'Siestov',
      email: 'vsi@container-xchange.com'
    },
    {
      id: 1,
      firstName: 'Somebody',
      lastName: 'Else',
      email: 'ses@container-xchange.com'
    }
  ];

  const complexSettings = {
    columns: {
      id: {
        title: 'ID',
        property: (row) => {
          return row.id.one.value;
        }
      },
      firstName: {
        title: 'First name',
        property: (row) => {
          return row.firstName.value;
        }
      },
      lastName: {
        title: 'Last name',
        property: (row) => {
          return row.lastName.two.three.value;
        }
      },
      email: {
        title: 'Email'
      }
    }
  };

  const complexSettingsWithSortFunc = {
    columns: {
      id: {
        title: 'ID',
        property: (row) => {
          return row.id.one.value;
        },
        sort: (row) => {
          return row.id.one.value;
        }
      },
      firstName: {
        title: 'First name',
        property: (row) => {
          return row.firstName.value;
        },
        sort: (row) => {
          return row.firstName.value;
        }
      },
      lastName: {
        title: 'Last name',
        property: (row) => {
          return row.lastName.two.three.value;
        },
        sort: (row) => {
          return row.lastName.two.three.value;
        }
      },
      email: {
        title: 'Email'
      }
    }
  };

  const complexData = [
    {
      id: {
        one: {
          value: 0
        }
      },
      firstName: {
        value: 'Valeriy'
      },
      lastName: {
        two: {
          three: {
            value: 'Siestov'
          }
        }
      },
      email: 'vsi@container-xchange.com'
    },
    {
      id: {
        one: {
          value: 1
        }
      },
      firstName: {
        value: 'Somebody'
      },
      lastName: {
        two: {
          three: {
            value: 'Else'
          }
        }
      },
      email: 'ses@container-xchange.com'
    },
    {
      id: {
        one: {
          value: 2
        }
      },
      firstName: {
        value: 'Third'
      },
      lastName: {
        two: {
          three: {
            value: 'Forth'
          }
        }
      },
      email: 'ses@container-xchange.com'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxVsTableComponent,
        NgxVsTableCellComponent,
        NgxVsCustomCellComponent,
        PageSlicePipe,
        SortPipe,
        HeadsPipe,
        ResponsivePipe,
        PaginationPipe,
        RowClassPipe,
        FilterPipe,
        PropertyPipe,
        CountPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVsTableComponent);
    component = fixture.componentInstance;
  });

  it('should change the page', () => {
    const spyOnPageChanged = spyOn(component.pageChanged, 'emit');
    component.settings = simpleSettings;
    component.data = simpleData;

    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(component.activePage).toEqual(0);

    component.onPageChange(1);

    expect(component.activePage).toEqual(1);
    expect(spyOnPageChanged).toHaveBeenCalledWith(1);
  });

  it('should identify', () => {
    component.settings = simpleSettings;
    expect(component.identify(0, {
      id: 3
    })).toEqual(3);
  });

  it('should update filter', () => {
    const spyOnPageChanged = spyOn(component.pageChanged, 'emit');

    component.onUpdateFilter({
      type: FilterTypeControl.number,
      key: 'id'
    }, 0, 10);

    expect(component.filterConfig).toEqual({
      id: {
        index: 0,
        type: FilterTypeControl.number,
        value: 10,
        filterFunction: undefined
      }
    });

    component.onUpdateFilter({
      type: FilterTypeControl.select,
      key: 'type'
    }, 0, 'select');

    expect(component.filterConfig).toEqual({
      id: {
        index: 0,
        type: FilterTypeControl.number,
        value: 10,
        filterFunction: undefined
      },
      type: {
        index: 0,
        type: FilterTypeControl.select,
        value: 'select',
        filterFunction: undefined
      }
    });

    component.onUpdateFilter({
      type: FilterTypeControl.checkbox,
      key: 'state'
    }, 0, true);

    expect(component.filterConfig).toEqual({
      id: {
        index: 0,
        type: FilterTypeControl.number,
        value: 10,
        filterFunction: undefined
      },
      type: {
        index: 0,
        type: FilterTypeControl.select,
        value: 'select',
        filterFunction: undefined
      },
      state: {
        index: 0,
        type: FilterTypeControl.checkbox,
        value: true,
        filterFunction: undefined
      }
    });

    component.onUpdateFilter({
      type: FilterTypeControl.text,
      key: 'name'
    }, 0, 'VS');

    expect(component.filterConfig).toEqual({
      id: {
        index: 0,
        type: FilterTypeControl.number,
        value: 10,
        filterFunction: undefined
      },
      type: {
        index: 0,
        type: FilterTypeControl.select,
        value: 'select',
        filterFunction: undefined
      },
      state: {
        index: 0,
        type: FilterTypeControl.checkbox,
        value: true,
        filterFunction: undefined
      },
      name: {
        index: 0,
        type: FilterTypeControl.text,
        value: 'VS',
        filterFunction: undefined
      }
    });

    component.onUpdateFilter({
      type: FilterTypeControl.text,
      key: 'name'
    }, 0, null);

    expect(component.filterConfig).toEqual({
      id: {
        index: 0,
        type: FilterTypeControl.number,
        value: 10,
        filterFunction: undefined
      },
      type: {
        index: 0,
        type: FilterTypeControl.select,
        value: 'select',
        filterFunction: undefined
      },
      state: {
        index: 0,
        type: FilterTypeControl.checkbox,
        value: true,
        filterFunction: undefined
      }
    });

    expect(spyOnPageChanged).toHaveBeenCalledWith(0);
  });

  it('should check box change', () => {
    const spyOnUpdateFilter = spyOn(component, 'onUpdateFilter');

    component.onCheckBoxChange({
      type: FilterTypeControl.text,
      key: 'name'
    }, 1, {
      target: {
        checked: true
      },
      preventDefault() {}
    } as unknown as Event);

    expect(spyOnUpdateFilter).toHaveBeenCalled();
  });

  it('should sort', () => {
    component.onSort({
      key: 'id',
      sortable: true,
      direction: SortDirection.desc,
      title: 'id'
    });

    expect(component.sortConfig).toEqual({
      key: 'id',
      direction: SortDirection.asc,
      property: undefined,
      sortFunction: undefined
    });
  });

  it('should present empty template', () => {
    component.settings = simpleSettings;
    component.data = [];
    try {
      component.emptyTemplate = {} as any;
      fixture.detectChanges();
    } catch (error) {
      // Do nothing.
    }
    expect(fixture.nativeElement.querySelector('.ngx-vs-table__empty-row')).toBeTruthy();
  });

  it('should not present empty template', () => {
    component.settings = simpleSettings;
    component.data = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ngx-vs-table__empty-row')).toBeFalsy();
  });
});
