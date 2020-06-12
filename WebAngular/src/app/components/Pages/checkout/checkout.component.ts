import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/classes/cart';
import { Userdetails } from 'src/app/classes/userdetails';
import { User } from 'src/app/classes/user';
import { OrderService } from 'src/app/services/crudcalls/order/order.service';
import { formatDate } from '@angular/common';
import { Configuration } from 'src/app/classes/config/Configuration';
import { StripeService } from 'src/app/services/crudcalls/stripeAPI/stripe.service';
import { async } from 'q';
import { Transaction } from 'src/app/classes/transaction';
import { DatePipe } from '@angular/common';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart = new Array<Cart>();
  total: number = 0;
  shipping: number = 0;
  isshippingdifferernt: boolean = false;
  userdetail = new Userdetails;
  user = new User;
  subtotal: number;
  saveinfo: boolean = false;
  transaction: Transaction = new Transaction();

  constructor(private router: Router, private orderservice: OrderService, private stripeservice: StripeService, private datePipe: DatePipe, private sessionservice: SessionService) {
    var navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras != null && navigation.extras.state != null) {
      var state = navigation.extras.state;
      if (state['cart'] != null) {
        this.cart = state['cart'];

      }

    }
    else {
      this.router.navigate(['/']);
    }
    this.loadStripe();
  }

  ngOnInit() { }

  items() {
    if (this.cart != null) {
      return this.cart.length;
    }
  }

  caltotal() {
    //var subtotal = 0;
    this.subtotal = 0
    this.cart.forEach(x => {
      this.subtotal += (x.quantity * x.discount);
    })

    return this.total = this.subtotal + this.shipping;
  }

  showshipping(event) {
    this.isshippingdifferernt = event.target.checked;
  }

  confirmorder() {

    this.cart.forEach(item => {
      this.placeorder(item, this.userdetail);
    });

    this.sendconfimationemail(this.cart, this.userdetail);
    this.cart = null;
    this.cart = new Array<Cart>();
    alert('Your order have been place');
    if (this.sessionservice.getUserId() != null || this.sessionservice.getUserId() != undefined || this.sessionservice.getUserId() != "") {
      this.router.navigate(['/myorders']);
    }
    else {
      this.router.navigate(['/']);
    }
  }
  sendconfimationemail(cart: Cart[], userdetail: Userdetails) {
    var myDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    var stringmessage = ""
    var bodyheader = "Below are the details of your order <br>";
    var reciverdetail = "<strong>Invoice No:</strong>" + this.transaction.invocie_no + " <br>" + "Ordered by :" + this.user.UserName + " <br>" + " Ordered date :" + myDate + "<br> Contact Number : " + userdetail.contact_number + "<br> Shipping Address : " + userdetail.shipping_street_address + " " + userdetail.shipping_city_address + " " +
      userdetail.shipping_state_address + " " + userdetail.shipping_country_address + " " + userdetail.shipping_zip;
      var Emailfooter = " <br> Your order will be shipped in 3 working days" + " <br> Best regards," + " <br> BD Electronics." ;   

    cart.forEach(c => {
      stringmessage = stringmessage + " Product :" + c.product_name + " <br> Varitent : " + c.varient + " <br> Color : " + c.color + " <br> Quantity : " + c.quantity + "<br> ";

    })
    var messagebody = bodyheader + stringmessage + reciverdetail + Emailfooter;
    this.orderservice.sendmail(messagebody, this.user.Email).subscribe();
  }

  placeorder(item: Cart, userdetail: Userdetails) {
    var tempprice = item.discount * item.quantity;
    this.orderservice.create(item, userdetail, tempprice, this.saveinfo, this.transaction).subscribe(data => { });
  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  pay() {
    this.shippingaddress();
    if (this.userdetail.contact_number == null || this.userdetail.contact_number == "") { alert('  ​​​​contact number'); return; }
    if (this.userdetail.billing_street_address == null || this.userdetail.billing_street_address == "") { alert('  ​​​​billing street address'); return; }
    if (this.userdetail.billing_city_address == null || this.userdetail.billing_city_address == "") { alert('  ​​​​billing city address'); return; }
    if (this.userdetail.billing_state_address == null || this.userdetail.billing_state_address == "") { alert('  ​​​​billing state address '); return; }
    if (this.userdetail.billing_country_address == null || this.userdetail.billing_country_address == "") { alert('  ​​​​billing countr address '); return; }
    if (this.userdetail.billing_zip == null || this.userdetail.billing_zip == "") { alert('  ​​​​billing zip     '); return; }
    if (this.userdetail.shipping_street_address == null || this.userdetail.shipping_street_address == "") { alert('  ​​​​shipping street address     '); return; }
    if (this.userdetail.shipping_city_address == null || this.userdetail.shipping_city_address == "") { alert('  ​​​​shipping city address     '); return; }
    if (this.userdetail.shipping_state_address == null || this.userdetail.shipping_state_address == "") { alert('  ​​​​shipping state address'); return; }
    if (this.userdetail.shipping_country_address == null || this.userdetail.shipping_country_address == "") { alert('  ​​​​shipping country address'); return; }
    if (this.userdetail.shipping_zip == null || this.userdetail.shipping_zip == "") { alert('  ​​​​shipping zip'); return; }
    if (this.user.FirstName == null || this.user.FirstName == "") { alert('  ​​​​FirstName    '); return; }
    if (this.user.LastName == null || this.user.LastName == "") { alert('  ​​​​LastName'); return; }
    // if (this.user.Email == null || this.user.Email == "") { alert('  ​​​​Email   '); return; }
    // if (this.user.UserName == null || this.user.UserName == "") {      alert('  ​​​​UserName'); return;    }

    var handler = (<any>window).StripeCheckout.configure({
      key: Configuration.stripe,
      locale: 'auto',
      token: async (token) => {
        this.user.Email = token.email;
        this.createpayment(token)
      }
    });



    handler.open({
      name: 'BD Electronics',
      description: "Please provide the details required blow.",
      amount: this.subtotal * 100
    });

  }

  createpayment(token) {



    this.stripeservice.payment(token, this.user, this.subtotal).subscribe(data => {
      if (data != null && data['records'] != null) {
        data['records'].forEach(element => {


          this.transaction.transaction_no = element['transaction_no'];
          this.transaction.invocie_no = element['invoice_no'];
          this.transaction.status = element['status'];
          this.transaction.transaction_date = this.transformDate(element['transaction_date']);
          this.transaction.currency = element['currency'];
          this.transaction.error_messaage = element['error_message'];
          this.transaction.success_message = element['success_message'];
          if (this.transaction != null) {
            this.confirmorder();
          }
        });
      }
    });

  }

  shippingaddress() {
    if (this.isshippingdifferernt == true) {
      this.userdetail.shipping_country_address = this.userdetail.billing_country_address;
      this.userdetail.shipping_state_address = this.userdetail.billing_state_address;
      this.userdetail.shipping_street_address = this.userdetail.billing_street_address;
      this.userdetail.shipping_city_address = this.userdetail.billing_city_address;
      this.userdetail.shipping_zip = this.userdetail.billing_zip;
    }

  }

  transformDate(unixtimestamp) {

    // Unixtimestamp


    // Months array
    let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Convert timestamp to milliseconds
    let date = new Date(unixtimestamp * 1000);

    // Year
    let year = date.getFullYear();

    // Month
    let month = months_arr[date.getMonth()];

    // Day
    let day = date.getDate();

    // Hours
    let hours = date.getHours();

    // Minutes
    let minutes = "0" + date.getMinutes();

    // Seconds
    let seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format



    return unixtimestamp == null ? "" : this.datePipe.transform(month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2), 'yyyy-MM-dd'); //whatever format you need. 



  }

}





