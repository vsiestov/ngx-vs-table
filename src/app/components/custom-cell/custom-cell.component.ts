import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss']
})
export class CustomCellComponent implements OnInit {
  @Input() value;
  @Input() action: (value, result) => void;

  constructor(
  ) { }

  ngOnInit() {
  }

  onPreview() {
    alert(this.value.name);
  }

  onEdit() {
    const result = prompt(this.value.name);

    if (this.action && typeof this.action === 'function') {
      this.action(this.value, result);
    }
  }

}
