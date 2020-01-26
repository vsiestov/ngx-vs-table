import { ResponsivePipe } from './responsive.pipe';
import { FilterTypeControl, ITableSettings } from '../interfaces/ngx-vs-table.interface';

const responsivePipe = new ResponsivePipe();

const settings: ITableSettings = {
  columns: {
    selected: {
      title: ''
    },
    id: {
      title: 'ID'
    },
    name: {
      title: 'Name'
    },
    position: {
      title: 'Position'
    },
    salary: {
      title: 'Salary'
    },
    start_date: {
      title: 'Start date'
    },
    office: {
      title: 'Office'
    },
    extn: {
      title: 'Extn.'
    }
  },
  head: {
    sticky: true
  },
  trackBy: 'id',
  rowClassFunction: (row) => {
    return parseInt(row.id, 10) % 2 === 0 ? 'odd' : 'even';
  }
};

const media = {
  matches: true
} as MediaQueryList;

const responsiveSettings: ITableSettings = {
  columns: {
    id: {
      title: 'id',
      sortable: false,
      filter: {
        type: FilterTypeControl.text
      },
      responsive: [
        {
          label: 'id: ',
          column: 0,
          media
        }
      ]
    },
    name: {
      title: 'Name',
      filter: true,
      responsive: [
        {
          label: true,
          column: 0,
          media
        }
      ]
    },
    position: {
      title: 'Position',
      filter: {
        type: FilterTypeControl.text,
        placeholder: 'Filter by position'
      },
      responsive: [
        {
          label: true,
          column: 1,
          media
        }
      ]
    },
    salary: {
      title: 'Salary',
      filter: true,
      responsive: [
        {
          label: true,
          column: 1,
          media
        }
      ]
    },
    start_date: {
      title: 'Start date',
      filter: {
        type: FilterTypeControl.text
      },
      responsive: [
        {
          label: true,
          column: 1,
          media
        }
      ]
    },
    office: {
      title: 'Office',
      filter: true,
      responsive: [
        {
          label: true,
          column: 2,
          media
        }
      ]
    },
    extn: {
      title: 'Extn.',
      filter: {
        type: FilterTypeControl.select,
        list: []
      },
      responsive: [
        {
          label: true,
          column: 2,
          media
        }
      ]
    },
    visible: {
      title: 'Visible',
      filter: {
        type: FilterTypeControl.checkbox
      },
      responsive: [
        {
          label: true,
          column: 2,
          media: {
            matches: false
          } as MediaQueryList
        }
      ]
    }
  },
  head: {
    sticky: true
  },
  trackBy: 'id',
  rowClassFunction: (row) => {
    return parseInt(row.id, 10) % 2 === 0 ? 'odd' : 'even';
  }
};

test('No responsive', () => {
  expect(responsivePipe.transform(settings.columns)).toEqual([
    [
      {
        title: '',
        value: 'selected'
      }
    ],
    [
      {
        title: 'ID',
        value: 'id'
      }
    ],
    [
      {
        title: 'Name',
        value: 'name'
      }
    ],
    [
      {
        title: 'Position',
        value: 'position'
      }
    ],
    [
      {
        title: 'Salary',
        value: 'salary'
      }
    ],
    [
      {
        title: 'Start date',
        value: 'start_date'
      }
    ],
    [
      {
        title: 'Office',
        value: 'office'
      }
    ],
    [
      {
        title: 'Extn.',
        value: 'extn'
      }
    ]
  ]);
});

test('Responsive', () => {
  expect(responsivePipe.transform(responsiveSettings.columns)).toEqual([
    [
      {
        filter: {
          type: 'text'
        },
        sortable: false,
        title: 'id: ',
        value: 'id'
      },
      {
        filter: true,
        title: 'Name',
        value: 'name'
      }
    ],
    [
      {
        filter: {
          placeholder: 'Filter by position',
          type: 'text'
        },
        title: 'Position',
        value: 'position'
      },
      {
        filter: true,
        title: 'Salary',
        value: 'salary'
      },
      {
        filter: {
          type: 'text'
        },
        title: 'Start date',
        value: 'start_date'
      }
    ],
    [
      {
        filter: true,
        title: 'Office',
        value: 'office'
      },
      {
        filter: {
          list: [],
          type: 'select'
        },
        title: 'Extn.',
        value: 'extn'
      },
      {
        filter: {
          type: 'checkbox'
        },
        title: 'Visible',
        value: 'visible'
      }
    ]
  ]);
});
