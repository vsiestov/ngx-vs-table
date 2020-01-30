import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ITableSettings,
  PaginationPosition
} from '../../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';
import { RowMenuComponent } from '../row-menu/row-menu.component';
import { userBuilder } from '../../helpers/faker.helper';
import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

const matchMediaMobile = matchMedia('(max-width: 500px)');
const matchMediaTable = matchMedia('(min-width: 501px) and (max-width: 900px)');

@Component({
  selector: 'responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveComponent implements OnInit {
  settings: ITableSettings = {
    columns: {
      id: {
        title: 'ID',
        filter: true
      },
      firstName: {
        title: 'First name',
        filter: true,
        responsive: [
          {
            label: true,
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 1,
            media: matchMediaTable
          }
        ]
      },
      lastName: {
        title: 'Last name',
        filter: true,
        responsive: [
          {
            label: true,
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 1,
            media: matchMediaTable
          }
        ]
      },
      email: {
        title: 'E-mail',
        filter: true,
        responsive: [
          {
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 1,
            media: matchMediaTable
          }
        ]
      },
      age: {
        title: 'Age',
        filter: true,
        responsive: [
          {
            label: true,
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 0,
            media: matchMediaTable
          }
        ]
      },
      company: {
        title: 'Company',
        filter: true,
        responsive: [
          {
            label: true,
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 2,
            media: matchMediaTable
          }
        ]
      },
      department: {
        title: 'Department',
        filter: true,
        responsive: [
          {
            label: true,
            column: 0,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 2,
            media: matchMediaTable
          }
        ]
      },
      actions: {
        title: 'Actions',
        sortable: false,
        component: RowMenuComponent,
        responsive: [
          {
            label: true,
            column: 1,
            media: matchMediaMobile
          },
          {
            label: true,
            column: 3,
            media: matchMediaTable
          }
        ]
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
  count = 20;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.data = [];

    for (let i = 0; i < this.count; i++) {
      this.data.push(userBuilder());
    }

    merge(
      fromEvent(matchMediaMobile, 'change'),
      fromEvent(matchMediaTable, 'change')
    )
      .pipe(
        tap(() => {
          console.log('match');

          this.settings = {
            ...this.settings,
            columns: {
              ...this.settings.columns
            }
          };

          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

}
