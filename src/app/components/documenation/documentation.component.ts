import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
