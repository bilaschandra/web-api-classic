import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  Landingpage: boolean;
 cart  = new Array<Cart>();
  public abc ="test";
  searchquery: any;
  maxprice: any;
  constructor(private router: Router, private productservice : ProductService) {


    var navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras != null && navigation.extras.state != null) {
      var state = navigation.extras.state;
      if (state['cart'] != null) {
        this.cart = state['cart'];      
      }

    }

    if (this.router.url == "/landingpage" || this.router.url == '/') {
      this.Landingpage = true;

    }
    else {
      this.Landingpage = false;
    }

    this.productservice.getmaxprice().subscribe(Data => {
      if(Data != null  && Data['records'] != null){
          Data['records'].forEach(element => {            
         this.maxprice =  element['maxprice']
          });
      }
    })
  }

  ngOnInit() {
  }

  receiveMessage(event) {
   
    this.searchquery =event;
  }

}

