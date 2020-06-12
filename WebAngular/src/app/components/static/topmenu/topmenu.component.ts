import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../../services/popup/modal.service";
import {MatIconModule} from '@angular/material/icon';

import { SessionService } from 'src/app/services/session/session.service';
import { Cart } from 'src/app/classes/cart';
import { NavigationExtras, Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: "app-topmenu",
  templateUrl: "./topmenu.component.html",
  styleUrls: ["./topmenu.component.scss"]
})
export class TopmenuComponent implements OnInit {

  

  @Input() cart: Cart[] = new Array<Cart>();  
  @Output() searcheventtop = new EventEmitter<string>();
  searchquery :string;
  show: boolean =true;
   
  constructor(private modalService: ModalService,private sessionService:SessionService,private router:Router) {
    }

  ngOnInit() { }

  openModal(id: string) {
    if(id == 'login'){
      this.close('signup');
    }
    if(id == 'signup'){  
      this.close('login');
    }
    this.modalService.open(id);
  }

  close(id) {
    this.modalService.close(id);
  }

  isLoggedIn() {
    
    if (this.sessionService.getToken() == null){
       
      return false;
    }
    return true;
  }

  logout(){
    this.sessionService.clear();
    this.router.navigate(['/']);
  }

  Home(){
    var navExtras: NavigationExtras = {};
    navExtras.state = {
      "cart" : this.cart,
      "search" :this.searchquery
    }
    this.router.navigate(['/'], navExtras);
  }

  receiveMessage(event) {
    this.searchquery = event;
    this.searcheventtop.emit(this.searchquery);
  }

  viewcart(){
    if (this.cart != null && this.cart.length == 0 )
    {
      return;
    }
    var navExtras: NavigationExtras = {};
    navExtras.state = {
      "cart" : this.cart,
      "search" :this.searchquery
    }
    this.router.navigate(['/viewcart'], navExtras);
  }

  viewprofile(){
    this.router.navigate(['/myprofile']);
  
  }

  vieworders(){
    this.router.navigate(['/myorders']);
   
  }

  setcalls(){
    this.show = !this.show;
  }
}
