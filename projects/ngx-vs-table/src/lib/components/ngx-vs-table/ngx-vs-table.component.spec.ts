import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsTableComponent } from './ngx-vs-table.component';
import { Component, NgModule, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVsTableCellComponent } from '../ngx-vs-table-cell/ngx-vs-table-cell.component';
import { NgxVsCustomCellComponent } from '../ngx-vs-custom-cell/ngx-vs-custom-cell.component';
import { NgxVsPaginationComponent } from '../ngx-vs-pagination/ngx-vs-pagination.component';
import { PageSlicePipe } from '../../pipes/page-slice.pipe';
import { ITableSettings } from '../../interfaces/ngx-vs-table.interface';

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
    }
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

  describe('Regular table cells', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          NgxVsTableComponent,
          NgxVsTableCellComponent,
          NgxVsCustomCellComponent,
          PageSlicePipe
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NgxVsTableComponent);
      component = fixture.componentInstance;
    });

    it('should be created', () => {
      component.settings = {
        columns: {}
      };
      component.data = [
        {
          id: 0,
          name: 'name'
        }
      ];

      fixture.detectChanges();

      component.ngOnChanges({
        settings: new SimpleChange(null, {
          columns: {}
        }, true),
        data: new SimpleChange(null, [
          {
            id: 0,
            name: 'name'
          }
        ], true)
      });

      expect(component).toBeTruthy();
    });

    it('should be created without columns', () => {

      component.ngOnChanges({
        settings: new SimpleChange(null, null, true),
        data: new SimpleChange(null, null, true)
      });

      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should be created without data', () => {
      component.settings = simpleSettings;
      fixture.detectChanges();

      component.ngOnChanges({
        settings: new SimpleChange(null, simpleSettings, true),
        data: new SimpleChange(null, null, true)
      });

      expect(component).toBeTruthy();
    });

    it('should be created with empty data', () => {
      component.settings = simpleSettings;
      component.data = [];

      fixture.detectChanges();

      component.ngOnChanges({
        settings: new SimpleChange(null, simpleSettings, true),
        data: new SimpleChange(null, [], true)
      });

      expect(component).toBeTruthy();
    });

    it('should be rendered with data', () => {

      component.settings = simpleSettings;
      component.data = simpleData;

      component.ngOnChanges({
        settings: new SimpleChange(null, simpleSettings, true),
        data: new SimpleChange(null, simpleData, true)
      });

      fixture.detectChanges();

      expect(component.heads.length).toEqual(4);
      expect(component.heads[0].title).toEqual('ID');

      expect(component.rows.length).toEqual(2);
      expect(component.rows[0][1][0].value).toEqual(simpleData[0].firstName);

      const element = fixture.nativeElement as HTMLTableElement;
      const headCells = element.querySelectorAll('thead tr th');
      const bodyRows = element.querySelectorAll('tbody');

      expect(headCells.length).toEqual(4);
      expect(headCells[0].textContent).toEqual(simpleSettings.columns.id.title);
      expect(headCells[1].textContent).toEqual(simpleSettings.columns.firstName.title);
      expect(headCells[2].textContent).toEqual(simpleSettings.columns.lastName.title);
      expect(headCells[3].textContent).toEqual(simpleSettings.columns.email.title);
      expect(bodyRows.length).toEqual(2);

      const cells = bodyRows[0].querySelectorAll('td');

      expect(cells[0].textContent).toContain(simpleData[0].id.toString());
      expect(cells[1].textContent).toContain(simpleData[0].firstName);
      expect(cells[2].textContent).toContain(simpleData[0].lastName);
      expect(cells[3].textContent).toContain(simpleData[0].email);
    });

    it('should sort columns', () => {
      component.settings = simpleSettings;
      component.data = simpleData;

      component.ngOnChanges({
        settings: new SimpleChange(null, simpleSettings, true),
        data: new SimpleChange(null, simpleData, true)
      });

      fixture.detectChanges();

      const table = fixture.nativeElement as HTMLTableElement;

      spyOn(component, 'onSort').and.callThrough();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalledWith({
        key: 'id',
        title: 'ID',
        sortable: true,
        property: undefined,
        sticky: false,
        stickyColumn: false
      });

      expect(component.rows[0][0][0].value).toEqual(0);
      expect(component.rows[1][0][0].value).toEqual(1);

      fixture.detectChanges();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalledWith({
        key: 'id',
        title: 'ID',
        sortable: true,
        direction: 'asc',
        property: undefined,
        sticky: false,
        stickyColumn: false
      });

      fixture.detectChanges();

      expect(component.rows[0][0][0]).toEqual({
        value: 1
      });
      expect(component.rows[1][0][0].value).toEqual(0);
    });

    it('should sort columns with a specific function', () => {
      component.settings = complexSettingsWithSortFunc;
      component.data = complexData;

      component.ngOnChanges({
        settings: new SimpleChange(null, complexSettingsWithSortFunc, true),
        data: new SimpleChange(null, complexData, true)
      });

      fixture.detectChanges();

      const table = fixture.nativeElement as HTMLTableElement;

      spyOn(component, 'onSort').and.callThrough();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalled();

      expect(component.rows[0][0][0].value).toEqual(0);
      expect(component.rows[1][0][0].value).toEqual(1);

      fixture.detectChanges();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalled();

      fixture.detectChanges();

      expect(component.rows[0][0][0]).toEqual({
        value: 2
      });
      expect(component.rows[1][0][0].value).toEqual(1);
    });

    it('should be rendered with complex data', () => {
      component.settings = complexSettings;
      component.data = complexData;

      component.ngOnChanges({
        settings: new SimpleChange(null, complexSettings, true),
        data: new SimpleChange(null, complexData, true)
      });

      fixture.detectChanges();

      expect(component.heads.length).toEqual(4);
      expect(component.heads[0].title).toEqual('ID');

      expect(component.rows.length).toEqual(3);
      expect(component.rows[0][1][0].value).toEqual(complexData[0].firstName.value);

      const element = fixture.nativeElement as HTMLTableElement;
      const headCells = element.querySelectorAll('thead tr th');
      const bodyRows = element.querySelectorAll('tbody');

      expect(headCells.length).toEqual(4);
      expect(headCells[0].textContent).toEqual(complexSettings.columns.id.title);
      expect(headCells[1].textContent).toEqual(complexSettings.columns.firstName.title);
      expect(headCells[2].textContent).toEqual(complexSettings.columns.lastName.title);
      expect(headCells[3].textContent).toEqual(complexSettings.columns.email.title);
      expect(bodyRows.length).toEqual(3);

      const cells = bodyRows[0].querySelectorAll('td');

      expect(cells[0].textContent).toContain(complexData[0].id.one.value.toString());
      expect(cells[1].textContent).toContain(complexData[0].firstName.value);
      expect(cells[2].textContent).toContain(complexData[0].lastName.two.three.value);
      expect(cells[3].textContent).toContain(complexData[0].email);
    });

    it('should be sorted complex data', () => {
      component.settings = complexSettings;
      component.data = complexData;

      component.ngOnChanges({
        settings: new SimpleChange(null, complexSettings, true),
        data: new SimpleChange(null, complexData, true)
      });

      fixture.detectChanges();

      const table = fixture.nativeElement as HTMLTableElement;

      spyOn(component, 'onSort').and.callThrough();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalled();

      expect(component.rows[0][0][0].value).toBe(0);
      expect(component.rows[1][0][0].value).toEqual(1);

      fixture.detectChanges();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalled();

      fixture.detectChanges();

      expect(component.rows[0][0][0].value).toEqual(2);
      expect(component.rows[1][0][0].value).toEqual(1);
    });
  });

  describe('Table with filters', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          NgxVsTableComponent,
          NgxVsTableCellComponent,
          NgxVsCustomCellComponent,
          PageSlicePipe
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NgxVsTableComponent);
      component = fixture.componentInstance;
    });

    const filterSettings: ITableSettings = {
      columns: {
        id: {
          title: 'ID',
          filter: {
            type: 'number'
          }
        },
        firstName: {
          title: 'First name',
          filter: true
        },
        lastName: {
          title: 'Last name',
          filter: true
        },
        status: {
          title: 'Status',
          filter: {
            type: 'select',
            list: [
              {
                value: 'active',
                title: 'Active'
              },
              {
                value: 'inactive',
                title: 'Inactive'
              }
            ]
          }
        },
        visible: {
          title: 'Visible',
          filter: {
            type: 'checkbox'
          }
        }
      }
    };

    const filterData = [
      {
        id: 0,
        firstName: 'Valeriy',
        lastName: 'Siestov',
        status: 'active',
        visible: false
      },
      {
        id: 1,
        firstName: 'Somebody',
        lastName: 'Else',
        status: 'inactive',
        visible: true
      }
    ];

    let element;
    let rows;

    beforeEach(() => {
      component.settings = filterSettings;
      component.data = filterData;

      component.ngOnChanges({
        settings: new SimpleChange(null, filterSettings, true),
        data: new SimpleChange(null, filterData, true)
      });

      fixture.detectChanges();

      element = fixture.nativeElement as HTMLTableElement;
      rows = element.querySelectorAll('thead tr');

      expect(rows.length).toEqual(2);

      expect(rows[1].querySelector('th:first-child input').getAttribute('type')).toEqual('number');
      expect(rows[1].querySelector('th:nth-child(2) input').getAttribute('type')).toEqual('text');
      expect(rows[1].querySelector('th:nth-child(4) select')).toBeTruthy();
      expect(rows[1].querySelector('th:last-child input').getAttribute('type')).toEqual('checkbox');
    });

    it('should be filtered by id', () => {
      expect(element.querySelectorAll('tbody').length).toEqual(2);
      const firstInput = (rows[1].querySelector('th:first-child input') as HTMLInputElement);
      const spyFilterChange = jest.spyOn(component, 'onUpdateFilter');

      firstInput.value = '0';
      firstInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(spyFilterChange).toHaveBeenCalledWith({
        type: 'number',
        key: 'id',
        placeholder: 'ID'
      }, 0, '0');
      expect(element.querySelectorAll('tbody').length).toEqual(1);

      firstInput.value = '';
      firstInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(element.querySelectorAll('tbody').length).toEqual(2);
    });

    it('should be filtered by name', () => {
      expect(element.querySelectorAll('tbody').length).toEqual(2);
      const input = (rows[1].querySelector('th:nth-child(2) input') as HTMLInputElement);
      const spyFilterChange = jest.spyOn(component, 'onUpdateFilter');

      input.value = 'some';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(spyFilterChange).toHaveBeenCalledWith({
        type: 'text',
        key: 'firstName',
        placeholder: 'First name'
      }, 1, 'some');
      expect(element.querySelectorAll('tbody').length).toEqual(1);

      input.value = '';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(element.querySelectorAll('tbody').length).toEqual(2);
    });

    it('should be filtered by status', () => {
      expect(element.querySelectorAll('tbody').length).toEqual(2);
      const select = (rows[1].querySelector('th:nth-child(4) select') as HTMLSelectElement);
      const spyFilterChange = jest.spyOn(component, 'onUpdateFilter');

      select.selectedIndex = 1;
      select.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(spyFilterChange).toHaveBeenCalledWith({
        type: 'select',
        placeholder: 'Status',
        list: [{title: 'Active', value: 'active'}, {title: 'Inactive', value: 'inactive'}],
        key: 'status'
      }, 3, 'active');

      fixture.detectChanges();

      expect(element.querySelectorAll('tbody').length).toEqual(1);

      select.selectedIndex = 0;
      select.dispatchEvent(new Event('change'));

      fixture.detectChanges();
      expect(element.querySelectorAll('tbody').length).toEqual(2);
    });

    it('should be filtered by status', () => {
      expect(element.querySelectorAll('tbody').length).toEqual(2);
      const checkbox = (rows[1].querySelector('th:nth-child(5) input') as HTMLInputElement);
      const spyFilterChange = jest.spyOn(component, 'onUpdateFilter');

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      expect(spyFilterChange).toHaveBeenCalledWith({
        type: 'checkbox',
        key: 'visible',
        placeholder: 'Visible'
      }, 4, true);

      expect(element.querySelectorAll('tbody').length).toEqual(1);

      checkbox.checked = false;
      checkbox.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(element.querySelectorAll('tbody').length).toEqual(1);

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(element.querySelectorAll('tbody').length).toEqual(2);
    });

  });

  describe('Custom table cells', () => {
    @Component({
      selector: 'ngx-vs-custom-table-component',
      template: `
        <div class="test-input">
          {{ prefix }}
        </div>
        <div>
          <span>{{ value?.firstName.value }}</span>
          <button>Edit</button>
        </div>
        <div>
          <span>{{ value?.email }}</span>
          <button>Send message</button>
        </div>
      `
    })
    class CustomTableComponent {
      prefix: string;
    }

    const settingsWithCustomComponents = {
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
        },
        actions: {
          title: 'Action',
          sortable: false,
          component: CustomTableComponent,
          componentOnInit: (instance: CustomTableComponent) => {
            instance.prefix = 'custom input';
          }
        }
      },
      trackBy: 'id'
    };

    @NgModule({
      imports: [
        CommonModule
      ],
      declarations: [
        NgxVsTableComponent,
        NgxVsTableCellComponent,
        NgxVsCustomCellComponent,
        NgxVsPaginationComponent,
        PageSlicePipe,
        CustomTableComponent
      ],
      entryComponents: [
        CustomTableComponent
      ]
    })
    class HostModule {
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          HostModule
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NgxVsTableComponent);
      component = fixture.componentInstance;
    });

    it('should be rendered with a component cell', () => {
      component.settings = settingsWithCustomComponents;

      component.ngOnChanges({
        settings: new SimpleChange(null, settingsWithCustomComponents, true),
        data: new SimpleChange(null, complexData, true)
      });

      fixture.detectChanges();

      const table = fixture.nativeElement as HTMLTableElement;
      const customComponents = table.querySelectorAll('ngx-vs-custom-table-component');

      expect(customComponents.length).toEqual(3);
      expect(customComponents[0].querySelector('span').textContent).toContain('Valeriy');

      spyOn(component, 'onSort').and.callThrough();

      table.querySelector('th:last-child > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalledWith({
        key: 'actions',
        title: 'Action',
        sortable: false,
        property: undefined,
        sticky: false,
        stickyColumn: false
      });

      expect(fixture).toMatchSnapshot();
    });
  });
});
