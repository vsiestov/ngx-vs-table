import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent implements OnInit {
  @Input() toggle: boolean;
  @Output() press: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
