import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RowMenuComponent } from '../row-menu/row-menu.component';
import { PersonComponent } from '../person/person.component';
import { CheckboxCellComponent } from '../checkbox-cell/checkbox-cell.component';
import {
  FilterTypeControl,
  ITableSettings,
  PaginationPosition
} from '../../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';
import { BetweenComponent } from '../between/between.component';
import { taskBuilder, userBuilder } from '../../helpers/faker.helper';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  subscriptions: Map<any, Subscription> = new Map();
  departments: string[];

  settings: ITableSettings = {
    columns: {
      toggle: {
        title: '',
        sortable: false,
        component: ToggleComponent,
        componentOnInit: (instance: ToggleComponent, row) => {
          this.subscriptions.set(instance, instance.press
            .pipe(
              tap(() => {
                this.data = this.data.map((item) => {
                  if (item.id === row.id) {
                    return {
                      ...item,
                      toggle: !item.toggle
                    };
                  }

                  return item;
                });
              })
            )
            .subscribe()
          );
        },
        componentOnUpdate: (instance: ToggleComponent, row) => {
          instance.toggle = row.toggle;
        },
        componentOnDestroy: (instance: ToggleComponent) => {
          this.subscriptions.get(instance).unsubscribe();
          this.subscriptions.delete(instance);
        }
      },
      id: {
        title: 'ID',
        filter: true
      },
      firstName: {
        title: 'First name',
        filter: true
      },
      lastName: {
        title: 'Last name',
        filter: true
      },
      email: {
        title: 'E-mail',
        filter: true
      },
      age: {
        title: 'Age',
        filter: {
          type: FilterTypeControl.custom,
          component: BetweenComponent,
          filterFunction: (row, value) => {
            if (typeof value.from === 'number' && typeof value.to === 'number') {
              return row.age >= value.from && row.age <= value.to;
            }

            if (typeof value.from === 'number') {
              return row.age >= value.from;
            }

            if (typeof value.to === 'number') {
              return row.age <= value.to;
            }

            return true;
          }
        }
      },
      company: {
        title: 'Company',
        filter: true
      },
      department: {
        title: 'Department',
        filter: true
      },
      actions: {
        title: 'Actions',
        sortable: false,
        component: RowMenuComponent,
        componentOnInit: (instance: RowMenuComponent) => {
          this.subscriptions.set(instance, instance.press
            .pipe(
              tap(() => {
                alert('Pressed');
              })
            )
            .subscribe()
          );
        },
        componentOnDestroy: (instance) => {
          this.subscriptions.get(instance).unsubscribe();
          this.subscriptions.delete(instance);
        }
      }
    },
    head: {
      sticky: true
    },
    trackBy: 'id',
    pagination: {
      perPage: 20,
      position: PaginationPosition.bottom,
      visible: true
    }
  };
  data: any[];
  count = 1000;

  visible: boolean;

  tasks: {
    [property: string]: any[]
  };

  nestedSettings: ITableSettings = {
    columns: {
      checkbox: {
        title: {
          component: CheckboxCellComponent,
          componentOnInit: (instance: CheckboxCellComponent, rows) => {

            instance.checked = rows.every((item) => {
              return item.checked;
            });

            this.subscriptions.set(instance, instance.update
              .pipe(
                tap((response) => {
                  this.tasks[rows[0].parentId] = this.tasks[rows[0].parentId].map((item) => {
                    return {
                      ...item,
                      checked: response
                    };
                  });
                })
              )
              .subscribe()
            );
          },
          componentOnDestroy: (instance) => {
            this.subscriptions.get(instance).unsubscribe();
            this.subscriptions.delete(instance);
          }
        },
        component: CheckboxCellComponent,
        componentOnInit: (instance: CheckboxCellComponent, row) => {
          this.subscriptions.set(instance, instance.update
            .pipe(
              tap((value) => {
                row.checked = value;
              })
            )
            .subscribe()
          );
        },
        componentOnUpdate: (instance: CheckboxCellComponent, row) => {
          instance.checked = row.checked;
          instance.ref.markForCheck();
        },
        componentOnDestroy: (instance) => {
          this.subscriptions.get(instance).unsubscribe();
          this.subscriptions.delete(instance);
        },
        sortFunction: (row) => {
          return row.checked;
        }
      },
      title: {
        title: 'Title'
      },
      person: {
        title: 'Person',
        sortFunction: (row) => {
          return row.person.name;
        },
        component: PersonComponent
      },
      status: {
        title: 'Status',
        property: (row) => {
          return row.status.name;
        }
      },
      priority: {
        title: 'Priority'
      },
      actions: {
        title: 'Actions',
        sortable: false,
        component: RowMenuComponent
      }
    },
    trackBy: 'id'
  };

  displayedColumns: string[] = ['id',
    'firstName',
    'lastName',
    'description',
    'email',
    'age'];

  testSettings: ITableSettings = {
    columns: {
      id: {
        title: 'id'
      },
      firstName: {
        title: 'name'
      },
      lastName: {
        title: 'description'
      },
      description: {
        title: 'status'
      },
      email: {
        title: 'priority'
      },
      age: {
        title: 'age'
      }
    }
  };
  testData = [];

  ngOnInit() {
    this.data = [];
    this.tasks = {};
    this.departments = [];

    for (let i = 0; i < this.count; i++) {
      const user = userBuilder();

      this.tasks[user.id] = [
        {
          ...taskBuilder(),
          parentId: user.id
        },
        {
          ...taskBuilder(),
          parentId: user.id
        },
        {
          ...taskBuilder(),
          parentId: user.id
        },
        {
          ...taskBuilder(),
          parentId: user.id
        },
        {
          ...taskBuilder(),
          parentId: user.id
        }
      ];

      this.data.push(user);

      if (this.departments.indexOf(this.data[i].department) === -1) {
        this.departments.push(this.data[i].department);
      }
    }

    this.settings.columns.department = {
      ...this.settings.columns.department,
      filter: {
        type: FilterTypeControl.select,
        list: this.departments.map((item) => {
          return {
            title: item,
            value: item
          };
        })
      }
    };

    this.settings = {
      ...this.settings,
      columns: {
        ...this.settings.columns
      }
    };

    this.testData = new Array(10000).fill(null).map((_, i) => {
      const u = userBuilder();

      return {
        id: i,
        firstName: u.firstName,
        lastName: u.lastName,
        description: u.department,
        email: u.email,
        age: u.age
      };
    });
  }

}
