import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seach'
})
export class SeachPipe implements PipeTransform {

  tmp = [];
  transform(items: any[], query: any): any[] {
    this.tmp.length = 0;
    if (!items) return [];
    if(query == null || query == ""||query == undefined)
    return items;

   return items.filter(x=>x.product_name.toLowerCase().trim().startsWith(query.toLowerCase().trim()) || x.description.toLowerCase().trim().startsWith(query.toLowerCase().trim())
   || x.vendor.toLowerCase().trim().startsWith(query.toLowerCase().trim())
   );
  

  }

}
