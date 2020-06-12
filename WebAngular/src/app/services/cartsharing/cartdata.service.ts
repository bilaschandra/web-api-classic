import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartdataService { 
 
  newcart :Cart[] = new Array<Cart>();
  private cartSource = new BehaviorSubject(this.newcart);
  currentcart = this.cartSource.asObservable();

  constructor() { }
 
  changecart(cart: Cart[]) {
    this.cartSource.next(cart)
  }

}
