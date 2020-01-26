import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'row-menu',
  templateUrl: './row-menu.component.html',
  styleUrls: ['./row-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowMenuComponent implements OnInit {
  @Output() press: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
