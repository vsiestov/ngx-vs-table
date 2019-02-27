import { Component, OnInit } from '@angular/core';
import * as expandable from '../../data/expandable.data';
import { ITableSettings } from '../../../../projects/ngx-vs-table/src/lib/interfaces/ngx-vs-table.interface';

@Component({
  selector: 'recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.scss']
})
export class RecursiveComponent implements OnInit {
  toppingSettings: ITableSettings = {
    columns: {
      id: {
        title: 'ID'
      },
      type: {
        title: 'Type'
      }
    }
  };

  settings = expandable.settings;
  data = expandable.data;

  constructor() { }

  ngOnInit() {
  }

}
