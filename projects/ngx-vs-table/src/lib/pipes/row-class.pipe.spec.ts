import { RowClassPipe } from './row-class.pipe';

const rowClassPipe = new RowClassPipe();

test('Testing custom class', () => {
  expect(rowClassPipe.transform({
    id: 1
  }, (prop) => {
    if (prop.id === 1) {
      return 'warning';
    }

    return '';
  })).toEqual('warning');
});

test('Testing empty case', () => {
  expect(rowClassPipe.transform({
    id: 1
  }, null)).toEqual('');
});
