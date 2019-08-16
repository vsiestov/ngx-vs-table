import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'checkbox-cell',
  templateUrl: './checkbox-cell.component.html',
  styleUrls: ['./checkbox-cell.component.scss']
})
export class CheckboxCellComponent implements OnInit, OnDestroy {
  @Input() value: boolean;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.change.observers.forEach((item) => {
      item.complete();
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.change.emit(target.checked);
  }
}
