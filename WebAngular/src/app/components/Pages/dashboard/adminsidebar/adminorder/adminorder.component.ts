import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/crudcalls/order/order.service';
import { Order } from 'src/app/classes/order';
import { DatePipe } from '@angular/common';
import { ModalService } from 'src/app/services/popup/modal.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.scss']
})
export class AdminorderComponent implements OnInit {
  @Input() type : string ="";
  orders :Order[] = new Array<Order>();
  opendd: number =-1;
  selected :string ;
  filterValue : string;
  orderId: number = 0;

  constructor(
    private orderservice :OrderService,
    private datePipe: DatePipe,
    private modalService:ModalService
    ) {

    this.orderservice.read().subscribe(data=>{
      if (data['records'] != null){
        data['records'].forEach(element => {
       
          this.orders.push(new Order(element['id'],"","",
          this.transformDate(element['issue_date']),
          (element['delivered_date'] == null ? element['delivered_date'] : element['delivered_date'].split(" ", 2)[0]),element['status']
          ,element['order_quantity'],element['order_total_price']
          ,element['contact_number'],element['billing_street_address'],element['billing_city_address'],
          element['billing_state_address'],element['billing_country_address'],
          element['shipping_street_address'],element['shipping_city_address'],
          element['shipping_state_address'],element['shipping_country_address'],
          element['billing_zip'],element['shipping_zip'],element['invoice_no']
          ))
        });
      }
    })

  

   }

  ngOnInit() {
  }  
  isedit : boolean =true;  
  isdelete : boolean =false;

  selectedtab(value: string) {
    switch (value) {
      case 'Edit':
        this.isedit = true;
        this.isdelete = false;
        break;
      case 'Delete':
        this.isedit = false;
        this.isdelete = true;
        break;
      default:
        this.isedit = true;
        this.isdelete = false;
        break;
    }
  }

  deleteorder(id){
    let index =this.orders.findIndex(d => d.id == id);
    if (index > -1) {this.orders.splice(index, 1);}
    this.orderservice.delete(id).subscribe();
  }

  toggle(catId): void {

    if (catId == this.opendd) {
      this.opendd = -1;

      (document.getElementById('status_' + catId) as HTMLInputElement).disabled = true;

      var element= document.getElementById('add_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;

    }
    else {
    this.opendd = catId;

    (document.getElementById('status_' + catId) as HTMLInputElement).disabled = false;

      var element = document.getElementById('edit_' + catId);
      element.style.display = null;
      element.style.display = "none";

      var element = document.getElementById('add_' + catId);
      element.style.display = null;
    }
  }

  saveorder(item:Order){
    this.orderservice.update(item).subscribe();
  

  }

  transformDate(date) {
    if(date == "0000-00-00 00:00:00"){
      return "";
    }
    return date == null ? "" : this.datePipe.transform(date, 'MM/dd/yyyy'); //whatever format you need. 
  }

  openProductModal(Id: string, orderId: number) {
    this.orderId = orderId;
    this.modalService.open(Id);
  }

  onCloseModalResetOrderId() {
    this.orderId = 0;
  }
}


