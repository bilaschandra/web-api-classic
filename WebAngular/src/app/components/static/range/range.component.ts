import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Options, LabelType } from 'ng5-slider';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})

export class RangeComponent implements OnInit {
@Input() maxprice =-1;
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
        this.minrange.emit(value == undefined ?0 :value);
      case 'max':          
      this.maxrange.emit(value == undefined ?0 :value);
      default:
       
      
    }
  }

  setmax(max){
    this.maxValue = max;
  }

  getoptions(max){ 
   
     return  this.options =   {
      floor: 0,
      ceil: Number(max),
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            
            this.valueChange(value,"min")
            return '<b>Min price:</b> $. ' + value;
          case LabelType.High:          
              this.valueChange(value,"max")
            return '<b>Max price:</b> $. ' + value;
          default:
            return '$. ' + value;
          
        }
      }
    };
  }

  

  
}
