import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { Router, NavigationExtras } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { Productattributes } from 'src/app/classes/productattributes';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() product: Product = new Product();  
  @Input() cart: Cart[] = new Array<Cart>();
  constructor(private router: Router, private productservice :ProductService) {



  }

  ngOnInit() {

  }

  calculateprice(price, discount) {
    if (Number(discount) == 0 ){
      return price;
    }
    return Number(price) - ((Number(price) * discount) / 100);
  }
 

  navigate(product) {
    var navExtras: NavigationExtras = {};
    navExtras.state = {
      "product": product,
      "cart": this.cart
    }
    this.router.navigate(['viewdetail'], navExtras);
  }

}
