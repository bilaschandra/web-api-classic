import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrderService } from 'src/app/services/crudcalls/order/order.service';
import { Order } from 'src/app/classes/order';
import { ModalService } from 'src/app/services/popup/modal.service';
import { Configuration } from 'src/app/classes/config/Configuration';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrls: ['./orderitem.component.scss']
})
export class OrderitemComponent implements OnInit {
  public order: Order[] = new Array<Order>();
  public products: any = [];
  @Input() orderId: number = 0;
  @Input() invoiceNo: string = '';
  @Output() onCloseAction: EventEmitter<any> = new EventEmitter();

  constructor(
    private orderservice: OrderService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    if (this.orderId) {
      this.loadData();
    } else if (this.invoiceNo) {
      this.loadProductsByInvoice();
    }
  }

  loadData() {
    this.orderservice.orderItemDetails(this.orderId).subscribe(data => {
      if (data['records']) {
        data['records'].forEach(data => {
          this.order = { ...data, image_url: Configuration.imagesURL + data['image_url'] };
        });
      }
    });
  }

  loadProductsByInvoice() {
    this.orderservice.orderItemDetailsByInvoice(this.invoiceNo).subscribe(data => {
      if (data['records']) {
        data['records'].forEach(data => {
          this.products.push({ ...data, image_url: Configuration.imagesURL + data['image_url'] });
        });
      }
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.onCloseAction.emit();
  }
}
