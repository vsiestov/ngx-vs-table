import { Component, OnInit } from '@angular/core';
import * as filterSettings from '../../data/filter.data';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  settings = filterSettings.settings;
  data = filterSettings.data;

  constructor() { }

  ngOnInit() {
  }

}
