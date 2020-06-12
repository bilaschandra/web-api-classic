import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';
import { Productattributes } from 'src/app/classes/productattributes';
import { ModalService } from 'src/app/services/popup/modal.service';
import { Cart } from 'src/app/classes/cart';
import { CartdataService } from 'src/app/services/cartsharing/cartdata.service';
import { Configuration } from 'src/app/classes/config/Configuration';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

   
  product: Product = new Product;
  productdetails = new Array<Productattributes>();
  images: string[] = new Array<string>();
  public main: string = "";
  discountedprice: number;
  actualprice: string;
  instock: boolean;
  selectedcolor: any;
  selectedvarient: any;
  quantity_av:Array<Number>;
  selectedquantity: number =1 ;
  cart: Cart[] =  new Array<Cart>();

  constructor(private router: Router, private productservice: ProductService, private modalService:ModalService,private dataservice:CartdataService) {


    var navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras != null && navigation.extras.state != null) {
      var state = navigation.extras.state;
      if (state['product'] != null) {
        this.product = state['product'];
        this.main = this.product.image_url;
        this.discountedprice = this.calculateprice(this.product.sell_price, this.product.discount)
        this.actualprice = this.product.sell_price;
        this.instock = this.product.instock;
        this.readproductdetail(this.product.id);
        this.readproductimages(this.product.id);
      }
      if (state['cart'] != null) {
        this.cart = state['cart'];
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  opencart() {

    var navExtras: NavigationExtras = {};
    navExtras.state = {
      "cart" : this.cart
    }
    this.router.navigate(['viewcart'], navExtras);
  }

  readproductdetail(product_id: string) {
    this.productservice.readproductdetail(product_id).subscribe(Data => {
      if (Data['records'] != null) {
        Data['records'].forEach(element => {
          this.productdetails.push(new Productattributes(
            element['id'], element['product_id'], element['varient'], element['color_option'], element['instock'], element['purchase_price'],
            element['sell_price'], element['discount'],element['quantity']))
            
        
        });
        this.quantity(this.productdetails[0].id) ;
        this.selectedcolor = this.productdetails[0].color;
        this.selectedvarient = this.productdetails[0].varient;
        
      }
    })
  }

  readproductimages(product_id: string) {

    this.productservice.readproductimages(product_id).subscribe(Data => {
      if (Data['records'] != null) {
        Data['records'].forEach(element => {
          this.images.push( Configuration.imagesURL + element['Url'])
        });
      }
    })

  }

  setimage(img) {
    this.main = img;
  }

  selected_color(event) {
    var temp_stock = this.productdetails.find(x => x.color.toLowerCase() == event.target.value.toLowerCase() && x.varient.toLowerCase() == this.selectedvarient.toString().toLowerCase())
    
    this.selectedcolor = event.target.value;
    if (temp_stock != undefined && Number(temp_stock.instock ) > 0) 
    {
      this.quantity(temp_stock.id);
      this.discountedprice = this.calculateprice(temp_stock.sell_price,temp_stock.discount);
      this.actualprice =temp_stock.sell_price;
      this.instock = true;
      this.product.discount = temp_stock.discount;
    
    }
    else{
      this.instock = false;
    }
  }

  selected_varient(event) {
    var temp_varient = this.productdetails.find(x => x.varient.toLowerCase() == event.target.value.toLowerCase() && x.color.toLowerCase() == this.selectedcolor.toString().toLowerCase());
   
    this.selectedvarient = event.target.value;
    if (temp_varient != undefined && Number(temp_varient.instock) >0)
    {
      this.quantity(temp_varient.id);
      this.discountedprice = this.calculateprice(temp_varient.sell_price,temp_varient.discount);
      this.actualprice = temp_varient.sell_price;
      this.instock = true;
      this.product.discount = temp_varient.discount;
    }
    else{
      this.instock = false;
    }
  }

  selected_quantity(event){
    this.selectedquantity = Number(event.target.value);
  }


  calculateprice(price, discount) {
    return Number(price) - ((Number(price) * discount) / 100);
  }

  OpenImagePopup() {
    
      this.openModal('image');
  }

  openModal(Id: string) {
     
    this.modalService.open(Id);
  }
  closeModal(Id: string) {
    this.modalService.close(Id);
  }

  public  quantity(id) { this.quantity_av = this.productdetails.find(x => x.id == id).quantity != undefined ? [...Array(Number(this.productdetails.find(x => x.id == id).quantity)).keys()].map(x=>x+1) : []
  }

  public addtocart(selected:Product){
        
    if (this.cart != null &&  this.cart.length > 0){
      if(this.cart.filter(x=>x.varient == this.selectedvarient && x.id == selected.id &&  x.color == this.selectedcolor && x.quantity == this.selectedquantity).length > 0){
        return ;
      } 
      else if(this.cart.filter(x=>x.varient == this.selectedvarient  && x.id == selected.id  && x.color == this.selectedcolor && x.quantity != this.selectedquantity).length > 0){
         this.cart.find(x=>x.varient == this.selectedvarient  && x.id == selected.id  && x.color == this.selectedcolor && x.quantity != this.selectedquantity).quantity = this.selectedquantity;
         this.dataservice.changecart(this.cart);
         return;  
      } 
    }
     var varient_id = '0';
      varient_id = this.productdetails.find(x=>x.varient ==this.selectedvarient && x.color == this.selectedcolor).id;
      this.cart.push(new Cart(selected.id,selected.product_name,
        selected.description,
        selected.vendor,
        selected.image_url,
        selected.catergory,
        this.selectedvarient,
        this.selectedcolor,
        this.instock,
        this.actualprice,this.discountedprice,Number(this.selectedquantity),varient_id));
       this.dataservice.changecart(this.cart);
  }
  
  distinctprod(){
    return [...new Set(this.productdetails.map(item => item.color))];
    
  }

  
  distinctvariebt(){
    return [...new Set(this.productdetails.map(item => item.varient))];
    
  }
}
