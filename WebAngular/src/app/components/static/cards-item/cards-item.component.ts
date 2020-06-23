import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';
import { Cart } from 'src/app/classes/cart';
import { Configuration } from 'src/app/classes/config/Configuration';

@Component({
  selector: 'app-cards-item',
  templateUrl: './cards-item.component.html',
  styleUrls: ['./cards-item.component.scss']
})
export class CardsItemComponent implements OnInit {

  @Input() selcategory: string = "";
  @Input() cart: Cart[] = new Array<Cart>();
  @Input() selcategory_id: string;
  @Input() vendor_name: string;
  @Input() searchquery: string;
  @Input() lowerlimit : number;
  @Input() upperlimit : number; 

  page = 1;
  pageSize = 9;
  products = new Array<Product>();

  constructor(private productservice: ProductService) {

    this.loadproducts();
  }



  ngOnInit() {
  }

  

  // private loadsearch(search: string) {
  //   this.vendor_name = "";
  //   this.category = "";
  //   this.products = null;
  //   this.products = new Array<Product>();
  //   this.productservice.search(search).subscribe(Data => {
  //     if (Data['records'] != null) {

  //       var temp_products = new Array<Product>();
  //       Data['records'].forEach(element => {
  //         temp_products.push(new Product(element['id'], element['product_name'], element['category_id'], element['purchase_price'], element['sell_price'], element['description'], element['vendor'],
  //         Configuration.imagesURL+ element['image_url'], element['catergory'], element['instock'], element['discount'], element['create_date']));
  //       });
  //       this.products = null;
  //       this.products = temp_products;

  //     }
  //   });
  // }

  private loadproducts() {
    this.productservice.read().subscribe(Data => {
      if (Data['records'] != null) {

        var temp_products = new Array<Product>();
        Data['records'].forEach(element => {
          temp_products.push(new Product(element['id'], element['product_name'], element['category_id'], element['purchase_price'], Number(element['sell_price']), element['description'], element['vendor'], Configuration.imagesURL+element['image_url'], element['catergory'], element['instock'], element['discount'], element['create_date']));
        });
        this.products = null;
        this.products = temp_products;
        
  
      }
    });
   }

  // public loadproduct(cat_id) {

  //   if (cat_id == null || cat_id == "") {
  //     return;
  //   }
  //   this.products = null;
  //   this.products = new Array<Product>();
  //   this.productservice.readcatid(cat_id).subscribe(

  //     Data => {

  //       if (Data['records'] != null) {

  //         var temp_products = new Array<Product>();
  //         Data['records'].forEach(element => {
  //           temp_products.push(new Product(element['id'], element['product_name'], element['category_id'],
  //             element['purchase_price'], element['sell_price'], element['description'], element['vendor'], Configuration.imagesURL+element['image_url'],
  //             element['catergory'], element['instock'], element['discount'], element['create_date']
  //           ))
  //         });

  //         this.products = temp_products;
  //       }
  //     }

  //   )
  // }
 

}
