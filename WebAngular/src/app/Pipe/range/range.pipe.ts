import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  tmp = [];
  transform(items: any[], field: string, lower: number, upper: number): any[] {
    this.tmp.length = 0;
    if (!items) return [];
    if (lower == undefined || upper == undefined || upper < lower) {
      this.tmp.push(...items);
      return this.tmp;
    }

    let arr = items.filter(x => Number(x.sell_price) >= Number(lower) && Number(x.sell_price) <= Number(upper));
    this.tmp.push(...arr)
    return this.tmp;
  }

}
