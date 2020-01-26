import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit {
  @Input() value: {
    person: {
      name: string;
      picture: string;
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
