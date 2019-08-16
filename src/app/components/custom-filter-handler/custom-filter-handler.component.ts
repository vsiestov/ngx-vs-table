import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-filter-handler',
  templateUrl: './custom-filter-handler.component.html',
  styleUrls: ['./custom-filter-handler.component.scss']
})
export class CustomFilterHandlerComponent implements OnInit {
  @Input() value: {filter: any; index: number};
  @Input() action: (filter: any, index: number, value: any) => any;

  clicks: number;

  constructor() {
    this.clicks = 0;
  }

  ngOnInit() {
  }

  onClick() {
    this.clicks++;

    if (this.clicks > 2) {
      this.clicks = 0;
    }

    this.action(this.value.filter, this.value.index, this.clicks);
  }
}
