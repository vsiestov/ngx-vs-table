import { Component, OnInit } from '@angular/core';
import * as simpleData from '../../data/simple.data';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  settings = simpleData.settings;
  data = simpleData.data;

  constructor() { }

  ngOnInit() {

  }

}
