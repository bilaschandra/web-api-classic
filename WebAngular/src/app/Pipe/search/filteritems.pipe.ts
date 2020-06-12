import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteritems'
})
export class FilteritemsPipe implements PipeTransform {


  tmp = [];
  transform(items: any[], value_cat: string, value_ven: string): any[] {
    if (!items) return [];
    if ((value_cat == undefined || value_cat == null) || (value_cat == "" || value_cat == "-1")) return items;
    if (value_cat != undefined && value_cat != null && (value_cat != "-1") && (value_ven == undefined || value_ven == null || value_ven == "")) {
      return items.filter(x => x.category_id == value_cat);
    }

    if (value_cat != undefined && value_cat != null && (value_cat != "-1") && value_ven != undefined && value_ven != null && value_ven != "") {
      return items.filter(x => x.category_id.toLowerCase().trim() == value_cat.toLowerCase().trim() && x.vendor.toLowerCase().trim() == value_ven.toLowerCase().trim());
    }

  }

}