import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Options, LabelType } from 'ng5-slider';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';

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
  options: Options
  constructor() { }

  ngOnInit() {
  }

  setMax(max) {
    this.maxValue = max;
    this.maxrange.emit(Number(max));
  }

  setMin(min) {
    this.minValue = min;
    this.minrange.emit(Number(min));
  }

  getoptions(max) {

    return this.options = {
      floor: 0,
      ceil: Number(max),
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '$' + value;
          case LabelType.High:
            return '$' + value;
          default:
            return '$' + value;
        }
      }
    };
  }

  resetRangeFilter() {
    this.setMax(Number(this.maxprice));
    this.setMin(0);
  }

}
