import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITableSettings } from 'ngx-vs-table/lib/interfaces/ngx-vs-table.interface';
import { build, fake } from 'test-data-bot';
import { ToggleComponent } from '../toggle/toggle.component';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { RowMenuComponent } from '../row-menu/row-menu.component';
import { PersonComponent } from '../person/person.component';
import { CheckboxCellComponent } from '../checkbox-cell/checkbox-cell.component';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  subscriptions: Map<any, Subscription> = new Map();

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
        title: 'ID'
      },
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      email: {
        title: 'E-mail'
      },
      age: {
        title: 'Age'
      },
      company: {
        title: 'Company'
      },
      department: {
        title: 'Department'
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
    trackBy: 'id'
  };
  data: any[];
  count = 100;

  nestedSettings: ITableSettings = {
    columns: {
      checkbox: {
        title: '',
        component: CheckboxCellComponent,
        componentOnInit: (instance: CheckboxCellComponent, row) => {
          this.subscriptions.set(instance, instance.update
            .pipe(
              tap((value) => {
                const index = this.data.findIndex((item) => {
                  return item.tasks.indexOf(row) !== -1;
                });

                this.data = this.data.map((item, dataIndex) => {
                  if (index === dataIndex) {
                    return {
                      ...item,
                      tasks: item.tasks.map((task) => {
                        if (task === row) {
                          return {
                            ...task,
                            checked: !task.checked
                          };
                        }

                        return task;
                      })
                    };
                  }

                  return item;
                });

                console.log(row, value);
              })
            )
            .subscribe()
          );
        },
        componentOnUpdate: (instance: CheckboxCellComponent, row) => {
          instance.checked = row.checked;
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

  constructor() {
  }

  ngOnInit() {
    this.data = [];

    const taskBuilder = build('Task').fields({
      checked: false,
      id: fake(f => f.random.number()),
      title: fake(f => f.lorem.words()),
      person: {
        name: fake(f => f.name.findName()),
        picture: fake(f => f.image.avatar())
      },
      status: {
        id: 1,
        name: 'todo'
      },
      priority: 'middle'
    });

    const userBuilder = build('User').fields({
      toggle: false,
      id: fake(f => f.random.number()),
      firstName: fake(f => f.name.firstName()),
      lastName: fake(f => f.name.lastName()),
      email: fake(f => f.internet.email()),
      age: fake(f => f.random.number(100)),
      company: fake(f => f.company.companyName()),
      department: fake(f => f.commerce.department()),
      tasks: [
        taskBuilder(),
        taskBuilder(),
        taskBuilder(),
        taskBuilder(),
        taskBuilder()
      ]
    });

    for (let i = 0; i < this.count; i++) {
      this.data.push(userBuilder());
    }
  }

}
