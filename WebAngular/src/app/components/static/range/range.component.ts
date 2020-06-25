import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Options, LabelType } from 'ng5-slider';
//import { ProductService } from 'src/app/services/crudcalls/products/product.service';

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

/* @Input() maxprice =-1;
@Output() minrange = new EventEmitter<number>();
@Output() maxrange = new EventEmitter<number>();
minValue: number = 0;
maxValue: number = 0;
options: Options 
  constructor() {}

  ngOnInit() {}
  
  
  valueChange(value:number,label:string){
    
    switch (label) {
      case 'min':
        this.minrange.emit(Number(value) <= 0 ? this.minValue : value);
      case 'max':          
      this.maxrange.emit(Number(value) <= 0 ? this.maxValue : value);
      default:
       
      
    }
  }

  setmax(max){
    this.maxValue = max;
    this.maxrange.emit(Number(max));
  }

  getoptions(max){ 
   
     return  this.options =   {
      floor: 0,
      ceil: Number(max),
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            
            this.valueChange(value,"min")
            return '<b>Min:</b> $' + value;
          case LabelType.High:          
              this.valueChange(value,"max")
            return '<b>Max:</b> $' + value;
          default:
            return '$' + value;
          
        }
      }
    };
  } */

  

  

