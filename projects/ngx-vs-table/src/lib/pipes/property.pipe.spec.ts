import { PropertyPipe } from './property.pipe';

const propertyPipe = new PropertyPipe();

test('getting object property', () => {
  expect(propertyPipe.transform({
    id: 1,
    name: 'Name'
  }, (row) => {
    return row.name;
  })).toEqual('Name');
});

test('getting the value if property is not a function', () => {
  expect(propertyPipe.transform({
    id: 1,
    name: 'Name'
  }, null)).toEqual(null);
});
