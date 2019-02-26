import { Component } from '@angular/core';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { findIndex } from 'lodash-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  settings = {
    columns: {
      id: {
        title: '#'
      },
      name: {
        title: 'Name',
        sticky: true
      },
      position: {
        title: 'Position'
      },
      office: {
        title: 'Office'
      },
      age: {
        title: 'Age'
      },
      start: {
        title: 'Start date'
      },
      actions: {
        title: 'Actions',
        sortable: false,
        component: CustomCellComponent,
        componentOnInit: (instance: CustomCellComponent) => {
          instance.action = (row, value) => {
            console.log(row, value);

            const index = findIndex(this.data, {
              id: row.id
            });

            this.data = [...this.data.slice(0, index), {
              ...this.data[index],
              name: value
            }, ...this.data.slice(index + 1)];
          };
        }
      }
    },
    head: {
      sticky: true
    },
    pagination: {
      perPage: 5,
      visible: true
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
      isActive: true
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
    },
    {
      id: 1,
      name: 'Airi Satou',
      position: 'Accountant',
      office: 'Tokyo',
      age: 33,
      start: '2008/11/28',
      salary: '162700',
      isActive: true
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

}
