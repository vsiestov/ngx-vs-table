import { PageSlicePipe } from './page-slice.pipe';

describe('PageSlicePipe', () => {
  const pipe = new PageSlicePipe();
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
    // @ts-ignore
    expect(pipe.transform({}, 1, 10)).toEqual([]);
  });

  it('should render a slice of pages', () => {
    expect(pipe.transform(list, 0, list.length)).toEqual([1, 2, 3, 4, 5]);
    expect(pipe.transform(list, 1, list.length)).toEqual([2, 3, 4, 5, 6]);
    expect(pipe.transform(list, 5, list.length)).toEqual([6, 7, 8, 9, 10]);
    expect(pipe.transform([1, 2, 3, 4, 5], 4, list.length)).toEqual([1, 2, 3, 4, 5]);

    expect(pipe.transform(list, list.length, list.length)).toEqual([16, 17, 18, 19, 20]);
  });

});
