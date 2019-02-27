import { Component, OnInit } from '@angular/core';
import * as expandable from '../../data/expandable.data';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {
  settings = expandable.settings;
  data = expandable.data;

  constructor() { }

  ngOnInit() {
  }

}
