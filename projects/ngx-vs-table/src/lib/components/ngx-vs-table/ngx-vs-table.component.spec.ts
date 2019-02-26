import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVsTableComponent } from './ngx-vs-table.component';
import { Component, NgModule, NO_ERRORS_SCHEMA, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxVsTableCellComponent } from '../ngx-vs-table-cell/ngx-vs-table-cell.component';
import { NgxVsCustomCellComponent } from '../ngx-vs-custom-cell/ngx-vs-custom-cell.component';
import { NgxVsPaginationComponent } from '../ngx-vs-pagination/ngx-vs-pagination.component';
import { PageSlicePipe } from '../../pipes/page-slice.pipe';

describe('NgxVsTableComponent', () => {
  let component: NgxVsTableComponent;
  let fixture: ComponentFixture<NgxVsTableComponent>;

  const simpleSettings = {
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
      fixture.detectChanges();

      component.ngOnChanges({
        settings: new SimpleChange(null, null, true),
        data: new SimpleChange(null, null, true)
      });

      expect(component).toBeTruthy();
    });

    it('should be created without data', () => {
      fixture.detectChanges();
      component.settings = simpleSettings;

      component.ngOnChanges({
        settings: new SimpleChange(null, simpleSettings, true),
        data: new SimpleChange(null, null, true)
      });

      expect(component).toBeTruthy();
    });

    it('should be created with empty data', () => {
      fixture.detectChanges();
      component.settings = simpleSettings;
      component.data = [];

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
      expect(component.rows[0][1].value).toEqual(simpleData[0].firstName);

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

      expect(component.rows[0][0].value).toEqual(0);
      expect(component.rows[1][0].value).toEqual(1);

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

      expect(component.rows[0][0]).toEqual({
        value: 1
      });
      expect(component.rows[1][0].value).toEqual(0);
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
      expect(component.rows[0][1].value).toEqual(complexData[0].firstName.value);

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

      expect(component.rows[0][0].value).toBe(0);
      expect(component.rows[1][0].value).toEqual(1);

      fixture.detectChanges();

      table.querySelector('th > div').dispatchEvent(new Event('click'));

      expect(component.onSort).toHaveBeenCalled();

      fixture.detectChanges();

      expect(component.rows[0][0].value).toEqual(2);
      expect(component.rows[1][0].value).toEqual(1);
    });
  });

  describe('Custom table cells', () => {
    @Component({
      selector: 'custom-table-component',
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
      const customComponents = table.querySelectorAll('custom-table-component');

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
