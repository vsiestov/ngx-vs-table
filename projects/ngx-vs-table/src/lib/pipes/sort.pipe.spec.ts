import { SortPipe } from './sort.pipe';
import { SortDirection } from '../interfaces/ngx-vs-table.interface';

const sortPipe = new SortPipe();
const list = [
  {
    id: 1
  },
  {
    id: 2
  }
];

const sortConfig = {
  direction: SortDirection.desc,
  key: 'id'
};

test('undefined config', () => {
  expect(sortPipe.transform(list, null)).toEqual(list);
});

test('non array input', () => {
  // @ts-ignore
  expect(sortPipe.transform({}, sortConfig)).toEqual([]);
});

test('normal array and config', () => {
  expect(sortPipe.transform(list, sortConfig)).toEqual([
    {
      id: 2
    },
    {
      id: 1
    }
  ]);
});

test('normal array and config with sort function', () => {
  expect(sortPipe.transform(list, {
    ...sortConfig,
    sortFunction: (row) => {
      return row.id;
    }
  })).toEqual([
    {
      id: 2
    },
    {
      id: 1
    }
  ]);
});

