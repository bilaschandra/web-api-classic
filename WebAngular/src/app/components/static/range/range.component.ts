import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Options } from 'ng5-slider';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})

export class RangeComponent implements OnInit {
  @Input() maxprice = -1;
  @Output() minrange = new EventEmitter<number>();
  @Output() maxrange = new EventEmitter<number>();
  minValue: number = 0;
  maxValue: number = 0;
  options: Options;

  constructor() { }

  ngOnInit() {
    this.options = {
      floor: 0,
      ceil: this.maxprice,
      translate: (value: number): string => `$${value}`,
    };
  }

  setMax(max) {
    this.maxValue = max;
    this.maxrange.emit(Number(max));
  }

  setMin(min) {
    this.minValue = min;
    this.minrange.emit(Number(min));
  }

  resetRangeFilter() {
    this.setMax(Number(this.maxprice));
    this.setMin(0);
  }

}
