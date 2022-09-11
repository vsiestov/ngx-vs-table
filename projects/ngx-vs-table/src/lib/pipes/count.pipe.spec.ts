import { CountPipe } from './count.pipe';

const countPipe = new CountPipe();
const list = [1, 2];
const obj = {a: 1, b: 2};
const str = 'ab';

test('count list size', () => {
  expect(countPipe.transform(list)).toBe(2);
});

test('count object keys number', () => {
  expect(countPipe.transform(obj)).toBe(2);
});

test('count string length', () => {
  expect(countPipe.transform(str)).toBe(2);
});

test('count invalid values', () => {
  expect(countPipe.transform(null)).toBe(0);
});

