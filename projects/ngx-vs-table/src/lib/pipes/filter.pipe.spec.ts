import { FilterPipe } from './filter.pipe';
import { FilterTypeControl } from '../interfaces/ngx-vs-table.interface';

const filterPipe = new FilterPipe();

const list = [
  {
    id: 1,
    name: 'Tiger Nixon',
    position: 'System Architect',
    salary: '$320,800',
    start_date: '2011/04/25',
    office: 'Edinburgh',
    extn: '5421',
    visible: true
  },
  {
    id: 2,
    name: 'Garrett Winters',
    position: 'Accountant',
    salary: '$170,750',
    start_date: '2011/07/25',
    office: 'Tokyo',
    extn: '8422',
    visible: false
  },
  {
    id: 3,
    name: 'Ashton Cox',
    position: 'Junior Technical Author',
    salary: '$86,000',
    start_date: '2009/01/12',
    office: 'San Francisco',
    extn: '1562',
    visible: true
  },
  {
    id: 4,
    name: 'Cedric Kelly',
    position: 'Senior Javascript Developer',
    salary: '$433,060',
    start_date: '2012/03/29',
    office: 'Edinburgh',
    extn: '6224',
    visible: false
  }
];

test('Filter by text type', () => {
  expect(filterPipe.transform(list, {
    name: {
      type: FilterTypeControl.text,
      index: 0,
      value: 'nixoN'
    }
  })).toEqual([list[0]]);

  expect(filterPipe.transform(list, {
    name: {
      type: FilterTypeControl.text,
      index: 0,
      value: 'AsHtoN'
    }
  })).toEqual([list[2]]);

  expect(filterPipe.transform(list, {
    name: {
      type: FilterTypeControl.text,
      index: 0,
      value: 1
    }
  })).toEqual([]);
});

test('Filter by number type', () => {
  expect(filterPipe.transform(list, {
    id: {
      type: FilterTypeControl.number,
      index: 0,
      value: 3
    }
  })).toEqual([list[2]]);
});

test('Filter by select type', () => {
  expect(filterPipe.transform(list, {
    extn: {
      type: FilterTypeControl.select,
      index: 0,
      value: '1562'
    }
  })).toEqual([list[2]]);

  expect(filterPipe.transform(list, {
    extn: {
      type: FilterTypeControl.select,
      index: 0,
      value: '-1'
    }
  })).toEqual(list);
});

test('Check undefined column', () => {
  expect(filterPipe.transform(list, {
    unknown: {
      type: FilterTypeControl.select,
      index: 0,
      value: '1562'
    }
  })).toEqual(list);
});

test('Filter function', () => {
  expect(filterPipe.transform(list, {
    office: {
      type: FilterTypeControl.select,
      index: 0,
      value: 'Edinburgh',
      filterFunction: (row, value) => {
        return row.office === value;
      }
    }
  })).toEqual([list[0], list[3]]);
});
