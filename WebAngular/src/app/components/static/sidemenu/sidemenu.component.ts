import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { Category } from 'src/app/classes/category';
import { CategoryService } from 'src/app/services/crudcalls/category/category.service';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';
import { Cart } from 'src/app/classes/cart';
import { RangeComponent } from '../range/range.component';

export type Config = {
  // selector?: String,
  multi?: boolean
};


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})



export class SidemenuComponent implements OnInit {

  @ViewChild(RangeComponent, { static: false })
  private rangeComponent: RangeComponent;

  @Input() cart: Cart[] = new Array<Cart>();
  @Input() searchquery :string;
  @Input() maxprice;
  category = new Array<Category>();
  config: Config;
  options: Config = { multi: false };
  selcategory: string = "";
  @Input() opendd: number;
  selcategory_id: string;
  vendor_name: string;
  upperlimit: number = 0;
  lowerlimit: number = 0;
  

  constructor(private categoryservice: CategoryService, private productservice: ProductService) {   

    this.categoryservice.readcategory().subscribe(Data => {
      if (Data['records'] != null) {

        Data['records'].forEach(element => {
          this.category.push(new Category(element['id'], element['category'], element['isactive'], this.setvendor(element['id'])))
        });
      }
      else {
        console.log("http call error!! ")
        return;
      }
    });
  }


  ngOnInit() {
    
    this.config = this.mergeConfig(this.options);
  }

  

  mergeConfig(options: Config) {

    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

 

  toggle(id: number, item: Category): void {
    if (this.opendd == id) {
      this.opendd = -1;
      this.selectedcategory(null); 
    }
    else {
      this.opendd = id;
      this.selectedcategory(item);
    }
  }


  setvendor(id: any): string[] {
    var vendor = new Array<string>();
    this.productservice.readvendorid(id).subscribe(Data => {
      if (Data != null && Data['records'] != null ) {

        Data['records'].forEach(element => {
          vendor.push(element['vendor']);
        });
      }
    });
    return vendor;
  }

  selectedcategory(choice: Category) {
    if(!choice){
      this.selcategory_id = "-1";
      this.selcategory  = "-1";
      this.vendor_name = "-1";
      if (choice === null) {
        this.rangeComponent.resetRangeFilter();
      }
    } else {
      this.selcategory_id = choice.id;
      this.selcategory  = choice.category;
      this.vendor_name = "";
    }
  }

  getvendorproducts(vendor){
    this.vendor_name = vendor
  }

  receivemax(maxvalue){
    this.upperlimit = maxvalue;
  }
  
  receivemin(minvalue){
    this.lowerlimit = minvalue;
  }
}
