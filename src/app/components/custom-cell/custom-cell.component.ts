import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss']
})
export class CustomCellComponent implements OnInit {
  @Input() value;
  @Input() action: (value, result) => void;
  @Input() phone: string;

  constructor(
  ) { }

  ngOnInit() {
  }

  onPreview() {
    alert(`Call to ${this.phone}`);
  }

  onEdit() {
    const result = prompt('Your first name', this.value.users.first_name);

    if (this.action && typeof this.action === 'function') {
      this.action(this.value, result);
    }
  }

}
