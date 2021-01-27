import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FilterTypeControl,
  IFilterConfig,
  ISortConfig,
  ITableSettings,
  PaginationPosition,
  TTableMode
} from '../../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToggleComponent } from '../toggle/toggle.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent implements OnInit {
  subscriptions: Map<any, Subscription> = new Map();
  settings: ITableSettings;
  data: any[];
  todos: {
    [userId: number]: {
      list: any[];
      total: number;
      page: number;
    }
  };
  api = 'https://jsonplaceholder.typicode.com';
  selectedUser: number;

  constructor(
    private httpClient: HttpClient,
    private ref: ChangeDetectorRef
  ) {
    this.todos = {};
    this.settings = {
      columns: {
        toggle: {
          title: '',
          sortable: false,
          component: ToggleComponent,
          componentOnInit: (instance: ToggleComponent, row) => {
            this.subscriptions.set(instance, instance.press
              .pipe(
                tap(() => {
                  this.todos[row.id] = {
                    list: [],
                    page: 0,
                    total: 0
                  };

                  this.data = this.data.map((item) => {
                    if (item.id === row.id) {
                      return {
                        ...item,
                        toggle: !item.toggle
                      };
                    }

                    if (item.toggle) {
                      return {
                        ...item,
                        toggle: false
                      };
                    }

                    return item;
                  });

                  this.selectedUser = row.id;

                  this.getTodos({
                    userId: row.id,
                    _limit: 5
                  })
                    .pipe(
                      tap((response) => {
                        this.todos[row.id].list = response.body as any[];
                        this.todos[row.id].total = parseInt(response.headers.get('X-Total-Count'), 10);

                        this.ref.markForCheck();
                      })
                    )
                    .subscribe();
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
          title: 'id'
        },
        name: {
          title: 'Name'
        },
        username: {
          title: 'Username'
        },
        email: {
          title: 'E-Mail'
        },
        company: {
          title: 'Company',
          property: (row) => {
            return row.name;
          }
        },
        phone: {
          title: 'Phone'
        },
        website: {
          title: 'Website'
        }
      },
      head: {
        sticky: true
      }
    };
  }

  todoSettings: ITableSettings = {
    columns: {
      id: {
        title: 'Id',
        filter: {
          type: FilterTypeControl.text
        }
      },
      title: {
        title: 'Title',
        filter: {
          type: FilterTypeControl.text
        }
      },
      completed: {
        title: 'Completed',
        filter: {
          type: FilterTypeControl.checkbox
        }
      }
    },
    mode: TTableMode.view,
    pagination: {
      visible: true,
      position: PaginationPosition.bottom,
      perPage: 5
    }
  };

  getUsers() {
    return this.httpClient.get(`${this.api}/users`);
  }

  getTodos(params) {
    return this.httpClient.get(`${this.api}/todos`, {
      params,
      observe: 'response'
    });
  }

  ngOnInit() {
    this.getUsers()
      .pipe(
        tap((response: any[]) => {
          this.data = response;

          this.ref.markForCheck();
        })
      )
      .subscribe();
  }

  onPageChange(page) {
    this.getTodos({
      userId: this.selectedUser,
      _limit: 5,
      _page: page
    })
      .pipe(
        tap((response) => {
          this.todos[this.selectedUser].list = response.body as any[];
          this.todos[this.selectedUser].page = page;

          this.ref.markForCheck();
        })
      )
      .subscribe();
  }

  onSort(event: ISortConfig) {
    const request: any = {
      userId: this.selectedUser,
      _page: 0
    };

    request._sort = event.key;
    request._order = event.direction;

    this.getTodos(request)
      .pipe(
        tap((response) => {
          this.todos[this.selectedUser].list = response.body as any[];
          this.todos[this.selectedUser].page = 0;
          this.todos[this.selectedUser].total = parseInt(response.headers.get('X-Total-Count'), 10);

          this.ref.markForCheck();
        })
      )
      .subscribe();
  }

  onFilter(event: IFilterConfig) {
    const request: any = {
      userId: this.selectedUser,
      _page: 0
    };

    for (const item in event) {
      if (event.hasOwnProperty(item)) {
        request[item] = event[item].value;
      }
    }

    this.getTodos(request)
      .pipe(
        tap((response) => {
          this.todos[this.selectedUser].list = response.body as any[];
          this.todos[this.selectedUser].page = 0;
          this.todos[this.selectedUser].total = parseInt(response.headers.get('X-Total-Count'), 10);

          this.ref.markForCheck();
        })
      )
      .subscribe();
  }
}
