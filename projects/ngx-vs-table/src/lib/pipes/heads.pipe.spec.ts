import { HeadsPipe } from './heads.pipe';
import { FilterTypeControl, IHeadKey, ITableSettings, SortDirection } from '../interfaces/ngx-vs-table.interface';

const headsPipe = new HeadsPipe();
const settings: ITableSettings = {
  columns: {},
  head: {
    sticky: true
  }
};
const keyList: IHeadKey[][] = [
  [
    {
      value: 'id',
      title: 'ID',
      filter: false
    }
  ]
];

test('Check undefined settings', () => {
  expect(headsPipe.transform(null, null, null)).toEqual({
    heads: [],
    filters: [],
    hasFilter: false
  });

  expect(headsPipe.transform(settings, null, null)).toEqual({
    heads: [],
    filters: [],
    hasFilter: false
  });

  expect(
    headsPipe.transform(
      {
        ...settings,
        head: {
          sticky: true,
          invisible: true
        }
      },
      [
        [
          {
            value: 'id',
            title: 'ID'
          }
        ]
      ],
      null
    )
  ).toEqual({
    heads: [],
    filters: [],
    hasFilter: false
  });
});

test('With settings', () => {
  expect(headsPipe.transform(settings, keyList, null)).toEqual({
    heads: [
      {
        direction: null,
        key: 'id',
        property: undefined,
        sortFunction: undefined,
        sortable: true,
        sticky: true,
        stickyColumn: false,
        title: 'ID'
      }
    ],
    filters: [null],
    hasFilter: false
  });

  expect(
    headsPipe.transform(
      settings,
      keyList.map((item) => {
        return item.map((key) => {
          return {
            ...key,
            sortable: false
          };
        });
      }),
      null
    )
  ).toEqual({
    heads: [
      {
        direction: null,
        key: 'id',
        property: undefined,
        sortFunction: undefined,
        sortable: false,
        sticky: true,
        stickyColumn: false,
        title: 'ID'
      }
    ],
    filters: [null],
    hasFilter: false
  });

  expect(
    headsPipe.transform(settings, keyList, {
      key: 'id',
      direction: SortDirection.desc
    })
  ).toEqual({
    heads: [
      {
        direction: SortDirection.desc,
        key: 'id',
        property: undefined,
        sortFunction: undefined,
        sortable: true,
        sticky: true,
        stickyColumn: false,
        title: 'ID'
      }
    ],
    filters: [null],
    hasFilter: false
  });
});

test('With filter options', () => {
  const result = headsPipe.transform(
    settings,
    [
      [
        {
          value: 'id',
          title: 'ID',
          filter: true
        }
      ],
      [
        {
          value: 'name',
          title: 'Name',
          filter: {
            type: FilterTypeControl.checkbox
          }
        }
      ]
    ],
    {
      key: 'id',
      direction: SortDirection.desc
    }
  );

  expect(result).toEqual({
    heads: [
      {
        direction: SortDirection.desc,
        key: 'id',
        property: undefined,
        sortFunction: undefined,
        sortable: true,
        sticky: true,
        stickyColumn: false,
        title: 'ID'
      },
      {
        direction: null,
        key: 'name',
        property: undefined,
        sortFunction: undefined,
        sortable: true,
        sticky: true,
        stickyColumn: false,
        title: 'Name'
      }
    ],
    filters: [
      {
        key: 'id',
        placeholder: 'ID',
        type: 'text'
      },
      {
        key: 'name',
        placeholder: 'Name',
        type: 'checkbox'
      }
    ],
    hasFilter: true
  });
});
