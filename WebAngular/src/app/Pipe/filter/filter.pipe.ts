import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  tmp = [];
  transform(items: any[], field : string, value : string): any[] {  
    if (field == null || value == null ){
      return items;
    }
    if (field == 'category_id' && value == '-1'){
      return items;
    }
   this.tmp.length = 0;
   if (!items) return [];
   if (!value || value.length == 0){
     this.tmp.push(...items);
     
     return this.tmp;
   } 
   let arr = items.filter(it => 
     ("" + it[field]).toLowerCase().trim() == (value.toLowerCase().trim()) );
     this.tmp.push(...arr);
     return this.tmp;
   }

}
