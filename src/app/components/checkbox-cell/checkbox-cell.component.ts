import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'checkbox-cell',
  templateUrl: './checkbox-cell.component.html',
  styleUrls: ['./checkbox-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxCellComponent implements OnInit {
  @Input() checked: boolean;
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;

    this.update.emit(input.checked);
  }
}
