# NgxVsTable

Demo: https://ngx-vs-table.firebaseapp.com/

## Installation

You can use npm

```
npm i ngx-vs-table
```

or yarn

```
yarn add ngx-vs-table
```

## How to use

Before using ngx-vs-table you have to import its module in some of your app module

```
import { NgxVsTableModule } from 'ngx-vs-table';

...

@NgModule({
    imports: [
        ...
        NgxVsTableModule,
        ...
    ]
})
export class AppModule {
    ...
}
```

Inside your component class you have to provide settings for your table. A simple configuration can be like this:

```
settings = {
    columns: {
        id: {
            title: '#',
            sticky: true,
            filter: {
                type: 'number'
            }
        },
        name: {
            title: 'Name',
            sortable: false,
            filter: true
        },
        position: {
            title: 'Position',
            sortFunction: (row) => {
                return row.position[0];
            },
            filter: {
                type: 'text',
                placeholder: 'Filter by position',
            }
        },
        office: {
            title: 'Office',
            filter: {
                type: 'select',
                list: [
                    {
                        title: 'Title',
                        value: 'value'
                    },
                    {
                        title: 'Title 2',
                        value: 'value2'
                    }
                ]
            }
        },
        age: {
            title: 'Age',
            filter: {
                type: 'checkbox'
            }
        },
        start: {
            title: 'Start date'
        },
        example: {
            title: 'Nested property',
            property: (row) => {
                return row.example.name
            }
        },
        actions: {
            title: 'Table actions',
            component: CustomCellComponent,
            componentOnInit: (componentInstance: CustomCellComponent, row: any) => {
                componentInstance.settings = {...}; // Set custom properties when component is created
            }
        }
    },
    trackBy: 'id',
    head: {
        sticky: true
    },
    pagination: {
        visible: true,
        perPage: 20
    },
    rowClassFunction: (row) => {
        if (row.isActive) {
            return 'active';
        }
        
        return '';
    }
};

data = [
    {
      id: 1,
      name: 'Airi Satou',
      position: 'Accountant',
      office: 'Tokyo',
      age: 33,
      start: '2008/11/28',
      salary: '162700',
      isActive: true,
      example: {
        name: 'Nested property example'
      }
    },
    {
      id: 2,
      name: 'Angelica Ramos',
      position: 'Chief Executive Officer (CEO)',
      office: 'London',
      age: 47,
      start: '2009/10/09',
      salary: '162700'
    },
    {
      id: 3,
      name: 'Ashton Cox',
      position: 'Junior Technical Author',
      office: 'San Francisco',
      age: 66,
      start: '2009/01/12',
      salary: '162700'
    },
    {
      id: 4,
      name: 'Bradley Greer',
      position: 'Software Engineer',
      office: 'London',
      age: 41,
      start: '2012/10/13',
      salary: '162700'
    },
    {
      id: 5,
      name: 'Brenden Wagner',
      position: 'Software Engineer',
      office: 'San Francisco\t',
      age: 28,
      start: '2011/06/07',
      salary: '206850'
    }
  ];
```

Inside a component template:

```
<ngx-vs-table
  [settings]="settings"
  [data]="data"
></ngx-vs-table>
```
