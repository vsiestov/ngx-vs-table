import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss']
})
export class CustomFilterComponent implements OnInit {
  @Input() value: {filter: any; index: number};
  @Input() action: (filter: any, index: number, value: any) => any;

  filter = '2019-02-27';
  isFiltered: boolean;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.action && typeof this.action === 'function') {
      if (this.isFiltered) {
        this.action(this.value.filter, this.value.index, '');
        this.isFiltered = false;
      } else {
        this.action(this.value.filter, this.value.index, this.filter);
        this.isFiltered = true;
      }
    }
  }
}
