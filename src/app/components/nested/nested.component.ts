import { Component, OnInit } from '@angular/core';
import * as nestedData from '../../data/nested-properties.data';

@Component({
  selector: 'nested',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.scss']
})
export class NestedComponent implements OnInit {

  settings = nestedData.settings;
  data = nestedData.data;
  activePage = 0;

  constructor() { }

  ngOnInit() {
  }

  onPageChange(page) {
    this.activePage = page;
  }

  onPerPageChanged(perPage) {
    this.settings = {
      ...this.settings,
      pagination: {
        ...this.settings.pagination,
        perPage
      }
    };

    this.activePage = 0;
  }

}
