import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Cart } from 'src/app/classes/cart';
import { Router, NavigationExtras } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart = new Array<Cart>();
  quantity = new Array<Number>();
  totprice: number;
  shipping: number = 0;
  total: number =0;

  constructor(private router: Router) {
    var navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras != null && navigation.extras.state != null) {
      var state = navigation.extras.state;
      if (state['cart'] != null) {
        this.cart = state['cart'];
        console.log(this.cart)

      }
      
    else{
      this.router.navigate(['/']);
    }
    }

    if (this.cart != null && this.cart.length > 0) {
      this.cart.forEach(x => {
        this.quantity.push(x.quantity);
      })
    }
    else{
      this.router.navigate(['/']);
    }


  }

  ngOnInit() {
  }

  test() {
    console.log(this.cart);
  }

  calculatetotal(quantity, discountedprice) {
    return quantity * discountedprice;
  }

  calculatesubtotal() {
    var subtotal = 0;
    this.cart.forEach(x => {
      subtotal += (x.quantity * x.discount);
    })
    this.total = subtotal + this.shipping;
    return subtotal;
  }

   checkout(){
     // checkout

     var navExtras: NavigationExtras = {};
     navExtras.state = {
       "cart" : this.cart
     }
     this.router.navigate(['checkout'], navExtras);
   }

   shopping(){
     
    var navExtras: NavigationExtras = {};
    navExtras.state = {
      "cart" : this.cart
    } 
    this.router.navigate(['/'], navExtras);
   }

   removeitem(item){
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    if(this.cart.length == 0){
      this.shopping();
    }
   }
}
