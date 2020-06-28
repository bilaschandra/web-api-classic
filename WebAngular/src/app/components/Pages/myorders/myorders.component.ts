import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Order } from 'src/app/classes/order';
import { OrderService } from 'src/app/services/crudcalls/order/order.service';
import { element } from 'protractor';
import { Productattributes } from 'src/app/classes/productattributes';
import { ProductService } from 'src/app/services/crudcalls/products/product.service';
import { Product } from 'src/app/classes/product';
import { SessionService } from 'src/app/services/session/session.service';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/classes/config/Configuration';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user/user.service';
import { Transaction } from 'src/app/classes/transaction';
import { StripeService } from 'src/app/services/crudcalls/stripeAPI/stripe.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements AfterViewInit {
 
  displayedColumns = ['InoviceNo', 'Name', 'Vendor', 'Varient', 'Color', 'Status', 'OrderDate', "DeliverDate", 'Quantity', 'Total'];
  displayedFooterColumns = ['InoviceNo'];
  public dataSource: MatTableDataSource<OrderInfo>;
  dataSource1: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  orders: Order[] = new Array<Order>();
  transaction : Transaction = new Transaction ();
  productdetails: Productattributes[] = new Array<Productattributes>()
  products: Product[] = new Array<Product>();
  noorders: boolean = false;
  prfileimage: any;
  user: User = new User;

  constructor(private orderservice: OrderService, private productservice: ProductService,
     private session: SessionService, private router: Router, private userservice: UserService,private stripeservice : StripeService) {

    if (this.session.getUserId() == null) {

      this.router.navigate(['/']);
      return;
    }
    this.getuser();
    this.orderservice.readid().subscribe(Data => {
      if (Data['records'] != null) {
        Data['records'].forEach(element => {
          this.orders.push(new Order(element['id'], element['user_id'], element['product_id'], element['issue_date'], element['delivered_date'], element['status'], 
          element['order_quantity'], element['order_total_price'],"","","","","","","","","","","",element['invoice_id']))
          this.readproductdetail(element['product_attribute_id']);
          this.loadproducts(element['product_id']);
        });
      }
    });
  }


  readproductdetail(product_attribute_id) {
    this.productservice.readProductAttrDetail(product_attribute_id).subscribe(Data => {
      if (Data['records'] != null) {
        Data['records'].forEach(element => {
          this.productdetails.push(new Productattributes(
            element['id'], element['product_id'], element['varient'], element['color_option'], element['instock'], element['purchase_price'],
            element['sell_price'], element['discount'], element['quantity']))
        });
      }
    })
  }

  loadproducts(id) {
    this.productservice.readid(id).subscribe(Data => {
      if (Data['records'] != null) {
        Data['records'].forEach(element => {
          this.products.push(new Product(element['id'], element['product_name'], element['category_id'], element['purchase_price'], element['sell_price'], element['description'], element['vendor'], element['image_url'], element['catergory'], element['instock'], element['discount'], element['create_date']));
        });
        
        this.dataSource = new MatTableDataSource(getorderinfo(this.orders, this.productdetails, this.products));
        this.dataSource1 = getorderinfo(this.orders, this.productdetails, this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {

  }
  getuser() {
    this.userservice.readuser().subscribe(data => {
      if (data['records'] != null) {
        data['records'].forEach(element => {
          this.user.FirstName = element['FirstName'];
          this.user.LastName = element['LastName'];
          this.user.Email = element['Email'];
          this.user.UserName = element['UserName'];
          this.user.ProflieImage_url = element['ProflieImage_url'];
          this.user.UserID = this.session.getUserId();
          this.prfileimage = Configuration.RestApiURL + this.user.ProflieImage_url;
        });
      }
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private refresh() {
    this.dataSource.data = getorderinfo(this.orders, this.productdetails, this.products);
  }

}



/** Builds and returns a new User. */
function getorderinfo(cus_order: Order[], pd_attr: Productattributes[], product: Product[]): OrderInfo[] {
  var orderinfo: OrderInfo[] = new Array<OrderInfo>();
  if (cus_order.length == 0) {
    this.noorders = true;
    return
  }
  for (let i = 0; i < Number(cus_order.length); i++) {
    var temp: OrderInfo = new OrderInfo()
    temp.InoviceNo = cus_order[i].invoice;
    temp.Name = product[i].product_name;
    temp.Vendor = product[i].vendor;
    temp.Varient = pd_attr[i].varient == undefined ? "" : pd_attr[i].varient;
    temp.Color = pd_attr[i].color
    temp.Status = cus_order[i].status;
    temp.OrderDate = cus_order[i].issue_date;
    temp.DeliverDate = cus_order[i].delivered_date;
    temp.Quantity = cus_order[i].order_quantity;
    temp.Total = cus_order[i].order_total_price;
    orderinfo.push(temp);
  }

  return orderinfo;
}


export class OrderInfo {

  constructor(private _InoviceNo: string = "",
    private _Name: string = "",
    private _Vendor: string = "",
    private _Varient: string = "",
    private _Color: string = "",
    private _Status: string = "",
    private _OrderDate: string = "",
    private _DeliverDate: string = "",
    private _Quantity: string = "",
    private _Total: string = "") { }

  set InoviceNo(_val: string) { this._InoviceNo = _val; }
  set Name(_val: string) { this._Name = _val; }
  set Vendor(_val: string) { this._Vendor = _val; }
  set Varient(_val: string) { this._Varient = _val; }
  set Color(_val: string) { this._Color = _val; }
  set Status(_val: string) { this._Status = _val; }
  set OrderDate(_val: string) { this._OrderDate = _val; }
  set DeliverDate(_val: string) { this._DeliverDate = _val; }
  set Quantity(_val: string) { this._Quantity = _val; }
  set Total(_val: string) { this._Total = _val; }


  get InoviceNo(): string { return this._InoviceNo; }
  get Name(): string { return this._Name; }
  get Vendor(): string { return this._Vendor; }
  get Varient(): string { return this._Varient; }
  get Color(): string { return this._Color; }
  get Status(): string { return this._Status; }
  get OrderDate(): string { return this._OrderDate; }
  get DeliverDate(): string { return this._DeliverDate; }
  get Quantity(): string { return this._Quantity; }
  get Total(): string { return this._Total; }
}

