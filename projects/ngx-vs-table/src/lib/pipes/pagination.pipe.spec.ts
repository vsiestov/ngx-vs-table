import { PaginationPipe } from './pagination.pipe';
import { IPagination, PaginationPosition } from '../interfaces/ngx-vs-table.interface';

const paginationPipe = new PaginationPipe();
const pagination: IPagination = {
  perPage: 2,
  position: PaginationPosition.top,
  visible: true
};
const list = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  },
  {
    id: 9
  },
  {
    id: 10
  }
];


test('Without array', () => {
  // @ts-ignore
  expect(paginationPipe.transform(null, null, 0)).toEqual([]);
});

test('Without pagination', () => {
  // @ts-ignore
  expect(paginationPipe.transform(list, null, 0)).toEqual(list);
});

test('with pagination', () => {
  expect(paginationPipe.transform(list, pagination, 0)).toEqual([
    {
      id: 1
    },
    {
      id: 2
    }
  ]);

  expect(paginationPipe.transform(list, pagination, 1)).toEqual([
    {
      id: 3
    },
    {
      id: 4
    }
  ]);

  expect(paginationPipe.transform(list, pagination, 2)).toEqual([
    {
      id: 5
    },
    {
      id: 6
    }
  ]);

  expect(paginationPipe.transform(list, {
    ...pagination,
    visible: false
  }, 2)).toEqual(list);
});
