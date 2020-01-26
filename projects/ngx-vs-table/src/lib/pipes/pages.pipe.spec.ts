import { PagesPipe } from './pages.pipe';
import { IPagination, PaginationPosition } from '../interfaces/ngx-vs-table.interface';

const pagesPipe = new PagesPipe();
const settings: IPagination = {
  visible: false,
  perPage: 20,
  position: PaginationPosition.bottom
};

test('With default pagination', () => {
  expect(pagesPipe.transform(null, 100)).toEqual([0, 1, 2, 3, 4]);
});

test('With wrong per page value', () => {
  expect(pagesPipe.transform({
    ...settings,
    perPage: 0
  }, 100)).toEqual([]);

  expect(pagesPipe.transform({
    ...settings,
    perPage: -10
  }, 100)).toEqual([]);
});
